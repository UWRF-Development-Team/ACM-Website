<ul>
    <?php
    include_once 'lib/phpqrcode/qrlib.php';

    if (!function_exists("startsWith")) {
        function startsWith(string $str, string $search): bool
        {
            return (substr($str, 0, strlen($search)) === $search);
        }
    }

    $json = json_decode(file_get_contents("config/links.json"));
    foreach ($json as $service) {
        if (!property_exists($service, "img")) {
            if (property_exists($service, "image")) {
                $service->img = $service->image;
                continue;
            }
            $service->img = "img/" . (property_exists($service, "service")
                    ? strtolower($service->service) : $service->link) . "_qr.png";
            QRcode::png($service->link, $service->img, 'L', 3, 1);
        } ?>
        <li>
            <img src="<?= $service->img ?>" alt="<?= $service->link ?> QR Code">
            <a href="<?= $service->link ?>"><?php
                if (startsWith($service->link, "https://")) {
                    echo substr($service->link, 8);
                } else if (startsWith($service->link, "http://")) {
                    echo substr($service->link, 7);
                } else echo $service->link;
                ?>
            </a>
        </li>
    <?php } ?>
</ul>