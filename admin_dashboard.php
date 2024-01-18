<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bestellungen";

// Verbindung herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung überprüfen
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

// Aktionen für Bearbeiten und Löschen
if (isset($_GET['action'])) {
    $bestellnummer = $_GET['bestellnummer'];

    if ($_GET['action'] == 'edit') {
        // Daten für die ausgewählte Bestellung abrufen
        $edit_query = "SELECT bestellnummer, stand, lieferdatum FROM bestellstatus WHERE bestellnummer = $bestellnummer";
        $edit_result = $conn->query($edit_query);

        if ($edit_result->num_rows == 1) {
            $edit_row = $edit_result->fetch_assoc();
            $edit_bestellnummer = $edit_row['bestellnummer'];
            $edit_stand = $edit_row['stand'];
            $edit_lieferdatum = $edit_row['lieferdatum'];
        }
    } elseif ($_GET['action'] == 'delete') {
        // Bestellung löschen
        $delete_query = "DELETE FROM bestellstatus WHERE bestellnummer = $bestellnummer";
        if ($conn->query($delete_query) === TRUE) {
            echo "Bestellung erfolgreich gelöscht!";
            header("Refresh:0; url=admin_dashboard.php"); // Zurück zum Dashboard nach dem Löschen
        } else {
            echo "Fehler beim Löschen der Bestellung: " . $conn->error;
        }
    }
}

// Verarbeitung des Aktualisierens einer vorhandenen Bestellung
if (isset($_POST['update'])) {
    $update_bestellnummer = $_POST['update_bestellnummer'];
    $update_stand = $_POST['update_stand'];
    $update_lieferdatum = $_POST['update_lieferdatum'];

    $update_query = "UPDATE bestellstatus SET stand='$update_stand', lieferdatum='$update_lieferdatum' WHERE bestellnummer='$update_bestellnummer'";

    if ($conn->query($update_query) === TRUE) {
        echo "Bestellung erfolgreich aktualisiert!";
        header("Refresh:0; url=admin_dashboard.php"); // Zurück zum Dashboard nach dem Aktualisieren
    } else {
        echo "Fehler beim Aktualisieren der Bestellung: " . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
</head>
<body>
    <h1>Admin Dashboard</h1>

    <!-- Tabelle für Bestellungen -->
    <table border="1">
        <tr>
            <th>Bestellnummer</th>
            <th>Stand</th>
            <th>Lieferdatum</th>
            <th>Aktionen</th>
        </tr>

        <?php
        // Daten aus der Datenbank abrufen und in der Tabelle anzeigen
        $sql = "SELECT bestellnummer, stand, lieferdatum FROM bestellstatus";
        $result = $conn->query($sql);

        while ($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>{$row['bestellnummer']}</td>";
            echo "<td>{$row['stand']}</td>";
            echo "<td>{$row['lieferdatum']}</td>";
            echo "<td>
                      <a href='admin_dashboard.php?action=edit&bestellnummer={$row['bestellnummer']}'>Bearbeiten</a> | 
                      <a href='admin_dashboard.php?action=delete&bestellnummer={$row['bestellnummer']}'>Löschen</a>
                  </td>";
            echo "</tr>";
        }
        ?>
    </table>

    <br>

    <?php
    // Bearbeiten-Formular
    if (isset($edit_bestellnummer)) {
        echo "<h2>Bestellung bearbeiten</h2>";
        echo "<form action='admin_dashboard.php' method='post'>";
        echo "Bestellnummer: <input type='text' name='update_bestellnummer' value='$edit_bestellnummer' readonly><br>";
        echo "Stand: <input type='text' name='update_stand' value='$edit_stand' required><br>";
        echo "Lieferdatum: <input type='date' name='update_lieferdatum' value='$edit_lieferdatum' required><br>";
        echo "<input type='submit' name='update' value='Aktualisieren'>";
        echo "</form>";
    }
    ?>

    <!-- Formular zum Hinzufügen einer neuen Bestellung -->
    <h2>Neue Bestellung hinzufügen</h2>
    <form action="admin_dashboard.php" method="post">
        Bestellnummer: <input type="text" name="neue_bestellnummer" required><br>
        Stand: <input type="text" name="neuer_stand" required><br>
        Lieferdatum: <input type="date" name="neues_lieferdatum" required><br>
        <input type="submit" name="submit" value="Hinzufügen">
    </form>

    <?php
    // Verarbeitung des Hinzufügens einer neuen Bestellung
    if (isset($_POST['submit'])) {
        $neue_bestellnummer = $_POST['neue_bestellnummer'];
        $neuer_stand = $_POST['neuer_stand'];
        $neues_lieferdatum = $_POST['neues_lieferdatum'];

        $insert_query = "INSERT INTO bestellstatus (bestellnummer, stand, lieferdatum) 
                         VALUES ('$neue_bestellnummer', '$neuer_stand', '$neues_lieferdatum')";

        if ($conn->query($insert_query) === TRUE) {
            echo "Neue Bestellung erfolgreich hinzugefügt!";
            header("Refresh:0"); // Seite neu laden, um die aktualisierte Tabelle anzuzeigen
        } else {
            echo "Fehler beim Hinzufügen der Bestellung: " . $conn->error;
        }
    }

    // Verbindung schließen
    $conn->close();
    ?>
</body>
</html>
