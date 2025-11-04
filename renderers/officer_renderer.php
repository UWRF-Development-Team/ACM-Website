<ul>
    <?php
    $officers = json_decode(file_get_contents("config/officers.json"));
    foreach ($officers as $officer) {

        $role = ucwords($officer->role);
        if (property_exists($officer, "position")) $officer->name = $officer->position;
        $name = ucwords($officer->name);
        $email = property_exists($officer, "email")
            ? ucwords($officer->email)
            : str_replace(" ", ".", strtolower($officer->name)) . "@my.uwrf.edu";

        ?>
        <li>
            <div class='officer-role'><?= $role ?></div>
            <div class='officer-name'><?= $name ?></div>
            <a class='officer-email' href='mailto:<?= $email ?>'><?= $email ?></a>
        </li>
    <?php } ?>
</ul>