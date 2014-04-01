% include('head.tpl')
<div id='content'>
            <section class="col-sm-8">
                <form id='form' class="col-sm-7" method='get' action='index.php'>
                    <h3>Sign Up</h3>
                    <ul id='signUp'>
                        <li class='col-sm-6 alpha'>
                            <label>First Name:</label>
                            <input type='text' name='fname' required='required' class='form-control' placeholder='Your First Name' />
                        </li>
                        <li class='col-sm-6 alpha omega'>
                            <label>Last Name:</label>
                            <input type='text' name='lname' required='required' class='form-control' placeholder='Your Last Name' />
                        </li>
                        <li>
                            <label>username:</label>
                            <input type='text' name='username' required='required' class='form-control' placeholder='Desired Username' />
                        </li>
                        <li>
                            <label>Password:</label>
                            <input type='password' name='password' required='required' class='form-control' placeholder='Desiered Password' />
                        </li>
                    </ul>
                    <button class='btn btn-primary'>Sign Up</button>
                </form>
            </section>
            <aside class="col-sm-4">
                <form method='get' id='signIn' action='index.php'>
                    <h3>Log In</h3>
                    <ul>
                        <li>
                            <label>Username</label>
                            <input type='text' name='username' class='form-control' placeholder='Your Username' />
                        </li>
                        <li>
                            <label>Pasword</label>
                            <input type='password' name='password' class='form-control' placeholder='Password' />
                        </li>
                    </ul>
                    <button class='btn btn-primary'>Login</button>
                </form>
            </aside>
        </div>
% include('foot.tpl')