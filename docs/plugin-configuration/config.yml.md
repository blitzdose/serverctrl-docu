---
sidebar_position: 1
---

It is recommended to change these settings though the app or web interface by using the admin user. However, it is still possible to edit a basic configuration through the `config.yml` file inside the `/plugins/ServerCtrl/` folder.

## Configuration values

| Configuration                           | Default                      | Type    | Description                                                                                            |
| --------------------------------------- | ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `Update-Check`                          | `true`                       | Boolean | Enables the search for a new update every time the plugin is started                                   |
| `Logging-types`                         |                              | List    | Types of events that gets logged by the plugin. See [Type options](#logging-types) for possible values |
| `Webserver.https`                       | `true`                       | Boolean | Enables HTTPS for the webserver                                                                        |
| `Webserver.frontend`                    | `true`                       | Boolean | Enables the integrated web interface                                                                   |
| `Webserver.servername`                  | <nobr>`Server Remote`</nobr> | String  | Legacy (Not used anymore)                                                                              |
| `Webserver.port`                        | `5718`                       | Integer | Port the webserver is listening on                                                                     |
| <nobr>`Webserver.editable-files`</nobr> |                              | List    | Files that can be edited directly through the app or web interface without downloading                 |
| `Webserver.users`                       |                              | Object  | Credentials for the users. **DO NOT EDIT!**                                                            |
| `Webserver.permissions`                 |                              | List    | Permissions for each registered user. See [Type options](#permissions) for possible values             |
| `Webserver.apppasswords`                |                              | Object  | Credentials for app access. **DO NOT EDIT!**                                                           |
| `Webserver.totp`                        |                              | Object  | TOTP secrets for 2FA. **DO NOT EDIT!**                                                                 |
| `Webserver.totp-pending`                |                              | Object  | Temporary TOTP data. **DO NOT EDIT!**                                                                  |
| `Webserver.debugging`                   | `false`                      | Boolean | Enables debugging information. Only used for debugging                                                 |

## Type options

### Logging-types

| Option             | Description                            |
| ------------------ | -------------------------------------- |
| `LOGIN_SUCCESS`    | A user has logged in successfully      |
| `LOGIN_FAIL`       | A failed login attempt was made        |
| `COMMAND_SEND`     | A command was send through the plugin  |
| `DOWNLOADED_FILES` | One or multiple files where downloaded |
| `UPLOADED_FILES`   | One or more files where uploaded       |
| `PLAYER_JOINED`    | A player joined the server             |
| `PLAYER_QUIT`      | A player left the server               |

### Permissions

| Permission       | Description                                                                            |
| ---------------- | -------------------------------------------------------------------------------------- |
| `KICK`           | Kick players                                                                           |
| `BAN`            | Ban players                                                                            |
| `OP`             | OP/DE-OP players                                                                       |
| `CONSOLE`        | Access the console                                                                     |
| `PLUGINSETTINGS` | Change settings regarding the plugin, mostly like editing the `config.yml` file        |
| `SERVERSETTINGS` | Change settings regarding the server, mostly like editing the `server.properties` file |
| `LOG`            | Access the log of the plugin                                                           |
| `FILES`          | Access file manager. Download, upload and modify files                                 |
| `ADMIN`          | Access all the above and everything else, editing users, creating backups and more     |