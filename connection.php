<?php
$servername = "localhost"; // Ändere dies entsprechend deiner MySQL-Konfiguration
$username = "root";         // Standardbenutzername für XAMPP
$password = "";             // Standardpasswort für XAMPP (leer, wenn nicht geändert)
$dbname = "bestellungen";

// Verbindung herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung überprüfen
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

// Bestellnummer aus dem Formular abrufen
if (isset($_POST['bestellnummer'])) {
    $bestellnummer = $_POST['bestellnummer'];

    // SQL-Abfrage
    $sql = "SELECT stand, lieferdatum FROM bestellstatus WHERE bestellnummer = $bestellnummer";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Daten aus der Datenbank abrufen
        $row = $result->fetch_assoc();
        $stand = $row['stand'];
        $lieferdatum = $row['lieferdatum'];

        // Bild je nach Stand anzeigen
        $bild = ($stand == 1) ? "https://images.t3n.de/news/wp-content/uploads/2022/11/getimgai-ki-bilder.jpg?class=hero-small" : (($stand == 2) ? "https://www.pr-bild-award.de/site-prba/assets/files/1/prba-teaser.jpg" : "bild3.jpg");

        // Ergebnisse anzeigen
        echo "Stand der Bestellung: $stand<br>";
        echo "Voraussichtliches Lieferdatum: $lieferdatum<br>";
        echo "<img src='$bild' alt='Bestellbild'>";
    } else {
        echo "Keine Daten gefunden";
    }
}

// Verbindung schließen
$conn->close();
?>
