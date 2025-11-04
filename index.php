<?php header("Refresh: 300;url='http://uwrf.acm.org/'"); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php include 'renderers/header_renderer.php'; ?>
</head>

<body>
<div id="base">
    <div class="acm">ACM: Association for Computing Machinery</div>
    <div class="acm">THIS SITE IS OUTDATED! Email Jameson for information.</div>
    <div class="links">
        <?php include 'renderers/link_renderer.php'; ?>
    </div>
    <div id="columns">
        <div class="column events">
            <h1>Events</h1>
            <?php include 'renderers/event_renderer.php'; ?>
        </div>
        <div class="column meme">
            <?php include 'renderers/meme_renderer.php'; ?>
        </div>
        <div class="column officers">
            <h1>Officers</h1>
            <?php include 'renderers/officer_renderer.php'; ?>
        </div>
    </div>
</div>
</body>
</html>
