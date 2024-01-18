<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "yalusystems_0001200432"; // Ändern Sie dies entsprechend Ihrer MySQL-Konfiguration

// Verbindung herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung überprüfen
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

// Bestellnummer aus dem Formular abrufen
if (isset($_POST['bestellnummer'])) {
    $bestellnummer = $_POST['bestellnummer'];

    // SQL-Abfrage mit Prepared Statement, um SQL-Injektion zu verhindern
    $sql = "SELECT stand, lieferdatum FROM bestellstatus WHERE bestellnummer = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $bestellnummer); // "i" steht für integer, da die Bestellnummer wahrscheinlich eine Zahl ist
    $stmt->execute();
    $result = $stmt->get_result();

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

    // Prepared Statement schließen
    $stmt->close();
}

// Verbindung schließen
$conn->close();
?>
