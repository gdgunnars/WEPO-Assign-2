Chatty
=======

Chatty the chat program allows users to communicate in real time, either via
channels or through private messages.


Get started
-------

Start by opening a shell and navigating to the client folder as follows:

     $ cd client/
     $ npm install

Next navigate to the server folder as follows:

    $ cd ../server/
    $ npm install

This will install all dependencies for the program.

To use the program, open a shell and navigate to the server folder and run:

    node chatserver.js

Then, in a new shell, navigate to the client folder and run:

    ng serve
Now, you can open your browser of choice (we recommend Google Chrome or
    Mozilla Firefox, other browsers may behave unexpectedly), and go to http://www.localhost:4200


Usage
-------
Commands can be executed through the chat itself by typing in messages starting
with an exclamation mark. Following is a full list of available commands:

    !op username        gives the specified user op privileges,
    !deop username      removes op privileges from the specified user,
    !kick username      kicks the specifid user from the channel,
    !ban username       bans the specifed user from the channel,
    !part               leaves the current channel.

All of these commands have buttons in the UI that you can use as well.
To send a private message, click the messaging icon next to a users name.

Run gulp tslint to run tslint on the code.

Bonus features
-------

- Possible to change the topic of a channel using the !topic sometopic command
- Possible to give op privileges to a user using the !op command
- Possible to remove op privileges from a user using the !deop command
- Possible to set a password using the !setpassword command (A user that has entered a password for a channel does not need to do so again)

Known Issues
-------

- As of now, there is no way to unban a user that has previously been banned.
- There is no way to remove a password from a channel, nor change it.
- TSlint complains about syntax being wrong that is required for ng2-bootstrap
to work properly, so we did not figure out how to fix these without breaking the
functionality.
- When you send a private msg to a user, the sender sees his message twice, while
the recipient only sees the msg once.
