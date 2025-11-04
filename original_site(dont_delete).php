<?php
	header("Refresh: 300;url='http://uwrf.acm.org/'");
	
	$url_get_reddit_page = "https://old.reddit.com/r/ProgrammerHumor/top/?sort=top&t=day";
	$content = file_get_contents($url_get_reddit_page);
	$matches = array();
	
	preg_match_all('/data-url="(.*?)"/', $content, $matches, PREG_OFFSET_CAPTURE);
	$length = count($matches);
	$url = "";
	for ($i = 0; $i < $length; $i++){
		if (preg_match('/png|jpe?g|gif|tif|bmp|webp/', $matches[0][$i][0])){
			$url = $matches[0][$i][0];
			break;
		}
	}
	$url = substr($url, 10, strlen($url) - 1);
	$url = rtrim($url, '"');
	
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Home</title>
        <style>
            body{
                background-color: black;
            }
            div.container {
                color: white;
                width: 99.5;
                height: 99.5%;
                border: 4px solid white;
				border-bottom: 0px;
				margin-left: 40px;
                margin-top: 7.7em;
            }

            header {
                padding: 1em;
                color: white;
                clear: left;
                text-align: center;
                border-style: solid;
                border-color: white;
                border-width: 0px 0px 2px 0px;
            }
            
            footer{
                color: black;
                clear: left;
                border-style: solid white;
                border-width: 0px 0px 0px 0px;
            }
            
            .officer-info {
                border-right: 2px solid white;
                float: left;
                text-align: center;
                width: 450px;
                height: 400px;
                margin: 0;
                padding: .5em;
                padding-top: 20px;
            }

            .officer-info ul {
                list-style-type: none;
                padding: 0;
            }

            .officer-info ul a {
                text-decoration: none;
            }
            
			.officer-header {
				border-bottom: 2px solid white;
			}
			
			.officer-list {
				margin-top: 0px;
			}
			
			.meme {
			    height: 415px;
			    max-height: 415px;
				padding-top: 10px;
				border: 4px solid white;
				border-top: 2px solid white;
			}
			
			.events {
			    height: 250px;
			    border-bottom: 4px solid white;
				padding-top: 10px;
			}
			
			.events p {
				padding-top: 6px;
				padding-bottom: 6px;
				text-align: center;
			}
			
			.events-header{
			    text-align: center;
				border-bottom: 2px solid white;
			}
			
			.repeated-events{
			    float: left;
			    max-height: 500px;
			    height: 250px;
			    border-right: 2px solid white;
			    padding: 5px;
			    border-bottom: 4px solid white;
			}
			.repeated-events p {
			    padding: 6px;
			    text-align: center;
			}
			.repeated-header{
			    text-align: center;
			    border-bottom: 2px solid white;
			}
         </style>
     </head>
    
    <div class="container">

<header>
    <center>
    <font size =100>ACM: Association for Computing Machinery</font>
    </center>
</header>
  
<div class="officer-info">
  <ul class="officer-list">
  </ul>
</div>

<div class="meme">
    <center>
    <img src=<?php echo $url ?> style="max-height: 400px; vertical-align: middle; media=screen and (min-width: 960px);"> 
    <img src=>
    </center>
</div>

<div class="repeated-events">
    <center>
        <font class="repeated-header" size = "40">Recurring Events</font>
    </center>
        <p><font class="event" size ="6">No Weekly Meetings on Wednesday at 5PM</font></p>
		<p><font class="event" size ="6">Stay Safe :)</font></p>
</div>
<div class="events">
    <center>
            <font class="events-header" size="40">ACM Newsfeed</font>
                    <!--<p><font class="event" size = "6">LAN Party - Nov 15th, 6pm, South Hall rm 221</font></p>
                    -->
                     <p><font class="event" size ="6">Join Our Discord Chat Room Today!!!</font></p>
                     <a href="https://discord.gg/9jsFjrd" style="color:red"><font class="event" size="6">https://discord.gg/92Vrnsn</font></a>
    </center>
        </div>
        
<footer></footer>

</div>
</html>
    
