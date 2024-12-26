<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['user-name']));
    $email = htmlspecialchars(trim($_POST['user-email']));
    $phone = htmlspecialchars(trim($_POST['user-phone']));
    $message = htmlspecialchars(trim($_POST['user-message']));

    if (!empty($name) && !empty($email) && !empty($phone)) {
        $to = "kholina.victoria@gmail.com"; // Укажите свой email
        $subject = "Новое сообщение с формы";
        $body = "Имя: $name\nEmail: $email\nТелефон: $phone\n\nСообщение:\n$message";
        $headers = "From: $email\r\nReply-To: $email";

        if (mail($to, $subject, $body, $headers)) {
            http_response_code(200);
            echo "Сообщение успешно отправлено!";
        } else {
            http_response_code(500);
            echo "Ошибка при отправке сообщения.";
        }
    } else {
        http_response_code(400);
        echo "Заполните все поля!";
    }
} else {
    http_response_code(405);
    echo "Метод не разрешен!";
}
?>