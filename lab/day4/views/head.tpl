<!DOCTYPE html>
<html lang='en'>

<head>
    <!-- JS -->
    <script type='text/javascript' src='http://code.jquery.com/jquery-2.0.3.js'></script>
    <script src='//code.jquery.com/ui/1.10.4/jquery-ui.js'></script>
    <script src='//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js'></script>
    <script type='text/javascript' src='/public/main.js'></script>
    <!-- CSS -->
    <link href='//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css' rel='stylesheet'>
    <link href='http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/flick/jquery-ui.min.css' rel='stylesheet'>
    <link href='/public/style.css' rel='stylesheet'>

</head>

<body>
    <div id='pop'></div>
    <div class='container'>
        <nav>
            <div id='logo'>
                <a href='/'>
                    <img src='/public/l.png' />
                </a>
            </div>
            <form id='userSearch' class='col-sm-11'>
                <label>Search Users Posts</label>
                <input id='getUsers' type='text' name='uName' class='form-control' placeholder='Enter Users Firstname' autocomplete='off' />
                <input id='userId' type='hidden' name='userId' value='' />
                <input type='hidden' name='controller' value='public' />
            </form>
        </nav>