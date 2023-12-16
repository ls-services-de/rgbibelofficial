<?php
$servername = "	FHBUwHgPWOr5R2Tt";
$username = "yalusystems_0001200432";
$password = "FHBUwHgPWOr5R2Tt";
$database = "yalusystems_0001200432";

// Verbindung herstellen
$conn = new mysqli($servername, $username, $password, $database);

// Überprüfen, ob die Verbindung erfolgreich war
$verbindungsstatus = $conn->connect_error ? "Nicht verbunden" : "Verbunden";

// Verbindung schließen
$conn->close();

// Ausgabe des Verbindungsstatus
echo $verbindungsstatus;
?>
