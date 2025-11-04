<ul>
    <?php
    $events = json_decode(file_get_contents("config/events.json"));
    function contains_any(string $haystack, ...$needles): bool
    {
        foreach ($needles as $str) {
            if (strpos($haystack, $str) !== false) {
                return true;
            }
        }
        return false;
    }

    function parse_days(string $repeats_on): array
    {
        $days = array();
        $repeats_on = strtolower($repeats_on);
        if (contains_any($repeats_on, "m", "mon", "monday")) {
            array_push($days, "Mon");
        }
        if (contains_any($repeats_on, "tu", "tues", "tuesday")) {
            array_push($days, "Tues");
        }
        if (contains_any($repeats_on, "w", "wed", "wednesday")) {
            array_push($days, "Wed");
        }
        if (contains_any($repeats_on, "th", "thurs", "thursday")) {
            array_push($days, "Thurs");
        }
        if (contains_any($repeats_on, "f", "fri", "friday")) {
            array_push($days, "Fri");
        }
        return $days;
    }

    function get_days($repeats_on): array
    {
        if (gettype($repeats_on) == "string") {
            return parse_days($repeats_on);
        } else if (gettype($repeats_on) == "array") {
            $days = array();
            foreach ($repeats_on as $str) {
                $days = array_merge($days, parse_days($str));
            }
            return $days;
        }
        return array();
    }

    foreach ($events as $event) {
        echo "<li>\n";
        $title = ucwords($event->title);
        echo "<div class='title'>$title</div>\n";

        if (property_exists($event, "recursion")) {
            if (property_exists($event->recursion, "repeats_on")) {
                echo "<div class='date'>Every ";
                $days = get_days($event->recursion->repeats_on);

                if (count($days) <= 2) {
                    foreach ($days as &$day) {
                        if (strtolower($day) == "wed") {
                            $day .= "nesday";
                        } else $day .= "day";
                    }
                    unset($day);
                }
                $schedule = implode(", ", $days);
                $lastIndex = strrpos($schedule, ", ");
                if ($lastIndex !== false) {
                    $schedule = substr_replace($schedule, "and ", $lastIndex + 2, 0);
                }
                print $schedule . "</div>\n";

            } else if (property_exists($event->recursion, "repeats_every")) {
                $date = strtotime($event->recursion->start_date);
                while ($date < time()) {
                    $date += 86400 * $event->recursion->repeats_every;
                }
                echo "<div class='date'>On " . date("m/d/Y", $date) . "</div>\n";
            } else if (property_exists($event->recursion, "start_date")) {
                echo "<div class='date'>" . $event->recursion->start_date . " - " . $event->recursion->end_date . "</div>\n";
            }
        } else if (property_exists($event, "date")) {
            echo "<div class='date'>On $event->date</div>\n";
        }
        if (property_exists($event, "time")) {
            echo "<div class='time'>At $event->time</div>\n";
        }
        if (property_exists($event, "description")) {
            echo "<div class='desc'>$event->description</div>\n";
        }
        echo "</li>\n";
    } ?>
</ul>