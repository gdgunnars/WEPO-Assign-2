Chatty
=======

Chatty the chat program allows users to communicate in real time, either via
channels or through private messages.


Get started
-------

Start by opening a shell and navigating to the client folder, and run:

    npm install
This will install all dependencies for the program.

To use the program, open a shell and navigate to the server folder and run:

    node chatserver.js

Then, in a new shell, navigate to the client folder and run:

    ng serve
Now, you can open your browser of choice (we recommend Google Chrome or
    Mozilla Firefox), and go to http://www.localhost:4200


Usage
-------
Commands can be executed through the chat itself by typing in messages starting
with an exclamation mark. Following is a full list of available commands:

    !op username        gives the specified user op privileges,
    !deop username      removes op privileges from the specified user,
    !kick username      kicks the specifid user from the channel,
    !ban username       bans the specifed user from the channel,
    !setpassword        sets the password to the following string,
    !part               leaves the current channel.
Bonus features
-------

- Possible to change the topic of a channel using the !topic sometopic commands
- Possible to give op privileges to a user using the !op command
- Possible to remove op privileges from a user using the !deop command
- Possible to set a password using the !setpassword command

Known Issues
-------
