# Screen

Screen is a common terminal multiplexer and terminal sharing tool.

## Create a named session

You can create a detached session using a command like:

```sh
screen -d -m -S my_session_name
```

## Connect to a session

To attach to an existing screen session simply run:

```sh
screen -x my_session_name
```
