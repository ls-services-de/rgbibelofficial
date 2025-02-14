// App.js
'use client';

import React, { useEffect, useState } from 'react';
import sanityClient from '@sanity/client';
import jsPDF from 'jspdf'; // Import jsPDF

const client = sanityClient({
  projectId: '6fnwq7k5',
  dataset: 'production',
  apiVersion: '2023-11-21',
  useCdn: true,
});

const Empfehlung = () => {
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [customAnswer, setCustomAnswer] = useState('');
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [isCustomAnswer, setIsCustomAnswer] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [finalRecommendation, setFinalRecommendation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionsData = await client.fetch(
          `*[_type == "questions"] | order(id asc) {
            _id,
            id,
            question,
            compatibleWith[]->{_id},
            file { asset->{ url } },
            fileName
          }`
        );

        const answersData = await client.fetch(
          `*[_type == "answers"] {
            _id,
            answer,
            nextQuestionId,
            useCustomAnswer,
            recommendedFor,
            isLastQuestion
          }`
        );

        setQuestions(questionsData);
        setAnswers(answersData);
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten: ', error);
      }
    };

    fetchData();
  }, []);

  const findAnswersForQuestion = (questionId) => {
    const currentQuestion = questions.find(q => q._id === questionId);

    if (!currentQuestion || !currentQuestion.compatibleWith) {
      return [];
    }

    return answers.filter((answer) =>
      currentQuestion.compatibleWith.some((q) => q._id === answer._id)
    );
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer._id,
    }));

    if (answer.isLastQuestion) {
      setFinalRecommendation(answer.recommendedFor);
      setShowRecommendation(true);
    } else if (answer.useCustomAnswer) {
      setIsCustomAnswer(true);
      setCurrentAnswer(answer);
    } else {
      nextStep(answer);
    }
  };

  const nextStep = (selectedAnswer) => {
    const nextId = selectedAnswer?.nextQuestionId || selectedAnswers[currentStep]?.nextQuestionId;

    if (nextId) {
      const nextQuestionIndex = questions.findIndex(q => q.id === nextId);
      setCurrentStep(nextQuestionIndex);
    } else {
      setShowRecommendation(true);
    }

    setCustomAnswer('');
    setIsCustomAnswer(false);
  };

  const handleCustomAnswerSubmit = () => {
    if (customAnswer.trim()) {
      // Speichern der benutzerdefinierten Antwort
      setSelectedAnswers((prev) => ({
        ...prev,
        [questions[currentStep]._id]: { answer: customAnswer, isCustom: true }, // Benutzerdefinierte Antwort hinzufügen
      }));

      const nextId = currentAnswer.nextQuestionId;
      nextStep({ nextQuestionId: nextId });
    }
  };

  const getRecommendation = () => {
    if (finalRecommendation) {
      return finalRecommendation === "support" ? 'Problem gelöst! Keine weitere Aktion nötig.' : 'Einsenden';
    }

    const recommendationCounts = { support: 0, einsenden: 0 };
    Object.values(selectedAnswers).forEach((answer) => {
      const selectedAnswer = typeof answer === 'string' ? answers.find((a) => a._id === answer) : answer;
      if (selectedAnswer?.recommendedFor) {
        recommendationCounts[selectedAnswer.recommendedFor]++;
      }
    });

    return recommendationCounts.support > recommendationCounts.einsenden
      ? 'Support'
      : 'Einsenden';
  };

  // Neue Funktion: PDF generieren
// Neue Funktion: PDF generieren
const generatePDF = () => {
  const doc = new jsPDF();

  // Datum und Uhrzeit
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString();
  const timeString = currentDate.toLocaleTimeString();

  doc.setFontSize(16);
  doc.text('Garantiebericht', 20, 20);

  // Datum und Uhrzeit einfügen
  doc.setFontSize(12);
  doc.text(`${dateString}, ${timeString} Uhr`, 20, 30);

  // Branding ("RGBIbelofficial")
  doc.setTextColor(4, 206, 254);
  doc.setFontSize(14);
  doc.text('RGBibel® UG', 20, 40);

  // Setze die Schriftgröße für den Markenhinweis
  doc.setFontSize(8);
  doc.text('RGBibel® ist eine eingetragene Marke der RaRiTec UG.', 20, 45);

  // Fragen und Antworten durchgehen
  doc.setTextColor(100, 100, 100);
  let yPosition = 60; // Startposition für Fragen und Antworten
  const pageWidth = doc.internal.pageSize.width - 40; // Width for text wrapping
  const questionSpacing = 5; // Abstand nach jeder Frage
  const answerSpacing = 10; // Abstand nach jeder Antwort

  // Check if questions exist before iterating
  if (questions && questions.length > 0) {
    questions.forEach((question, index) => {
      const selectedAnswer = selectedAnswers[question._id];

      // Check if a valid answer is available
      if (selectedAnswer) {
        const answerText = selectedAnswer && typeof selectedAnswer === 'object' && selectedAnswer.isCustom
          ? `Benutzerdefinierte Antwort: ${selectedAnswer.answer}`
          : selectedAnswer
            ? answers.find(a => a._id === selectedAnswer)?.answer || 'Keine Antwort'
            : 'Keine Antwort';

        const questionText = question.question || 'Frage unbekannt';

        // Add only answered questions to the PDF
        if (answerText && answerText !== 'Keine Antwort') {
          doc.setFontSize(12);
          
          // Split long question and answer text into multiple lines
          const questionLines = doc.splitTextToSize(`Frage ${index + 1}: ${questionText}`, pageWidth);
          const answerLines = doc.splitTextToSize(`Antwort: ${answerText}`, pageWidth);

          // Write question lines
          doc.text(questionLines, 20, yPosition);
          yPosition += questionSpacing * questionLines.length; // Adjust yPosition for multi-line text

          // Write answer lines
          doc.text(answerLines, 20, yPosition);
          yPosition += answerSpacing * answerLines.length; // Adjust yPosition for multi-line text

          // Check if the yPosition exceeds the page height, add a new page if necessary
          if (yPosition > doc.internal.pageSize.height - 20) {
            doc.addPage();
            yPosition = 20; // Reset yPosition for the new page
          }
        }
      }
    });
  } else {
    doc.text('Keine Fragen verfügbar.', 20, yPosition);
  }

  // Datenschutzhinweis am Ende des PDFs (Hier kannst du deinen Datenschutzhinweis hinzufügen)

  doc.save('Garantiebericht.pdf');
};







  if (questions.length === 0) return <div className='text-white mx-auto'>Lade Fragen...</div>;

  if (currentStep >= questions.length || !questions[currentStep]) {
    return <div>Fragen nicht gefunden...</div>;
  }

  const currentQuestion = questions[currentStep];
  const currentAnswers = findAnswersForQuestion(currentQuestion._id);

  const prevStep = () => {
  if (currentStep > 0) {
    setCurrentStep(currentStep - 1);
  }
};


  return (
    <div className="app-container">
      {!showRecommendation ? (
        <>
          <h1>Frage {currentStep + 1}</h1>
          <div className="question-step">
            <h2>{currentQuestion.question}</h2>
            {currentQuestion.file && (
              <div>
                <a className='text-primary underline decoration-primary' href={currentQuestion.file.asset.url} target="_blank" rel="noopener noreferrer">
                  {currentQuestion.fileName}
                </a>
              </div>
            )}
            <div className="answers-list">
              {currentAnswers.map((answer) => (
                <div key={answer._id} className="answer-option">
                  <label>
                    <input
                      type="radio"
                      name={`question-${currentQuestion._id}`}
                      value={answer._id}
                      onChange={() => handleAnswerSelect(currentQuestion._id, answer)}
                    />
                    {answer.answer}
                  </label>
                </div>
              ))}
            </div>

            {isCustomAnswer && (
              <div className="custom-answer text-white">
                <label>
                  Benutzerdefinierte Antwort:
                  <input
                    className='ml-2 p-2 text-black rounded'
                    type="text"
                    value={customAnswer}
                    onChange={(e) => setCustomAnswer(e.target.value)}
                    placeholder="Ihre Antwort hier eingeben"
                  />
                </label>
                <button className='ml-3 bg-primary p-2 rounded' onClick={handleCustomAnswerSubmit}>Weiter</button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="recommendation">
  <h2>Empfehlung: {getRecommendation()}</h2>
  
  {finalRecommendation === 'einsenden' && (
    <>
    <p className="mt-3 text-white">
        Basierend auf unserer Analyse müssen Sie Ihren PC zur weiteren Untersuchung einsenden. 
        Bitte laden Sie das generierte PDF-Dokument herunter und legen Sie es Ihrer Einsendung bei. 
        Es enthält wichtige Informationen zu Ihrem Garantieanspruch und ist daher entscheidend für den weiteren Prozess.
        Stellen Sie sicher, dass Sie das PDF speichern, bevor Sie Ihre Unterlagen abschicken.
      </p>
      <button onClick={() => window.location.href = '/garantie-formular'}>
        Zum Garantieformular
      </button>
      
    </>
  )}

  {/* Button zum Herunterladen des PDFs */}
  <button className='ml-8 mt-3' onClick={generatePDF}>Antworten herunterladen (PDF)</button>
</div>

      )}
    </div>
  );
};

export default Empfehlung;
