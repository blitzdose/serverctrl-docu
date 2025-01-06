---
sidebar_position: 99
---

# FAQ

Got a question? Then this is the right page for you! Please have a look if you find the answer here before asking on Discord.

<details>
  <summary>Where can I find the credentials?</summary>

  The plugin creates a new account called `admin` whenever it doesn't exist (At the start and when you delete it). The password is randomly generated and will be shown in the console.

  If you missed it, the easiest way to get a new admin account is to delete the file `plugins/ServerCtrl/config.yml`. Alternatively you can also delete just the `admin` account in there, but you have to be careful to keep the right syntax. Here is an example of the config with the `admin` account deleted:

  ```yaml title="/plugins/ServerCtrl/config.yml"
# [...]
Webserver:
  https: true
  frontend: true
  servername: Server Remote
  port: 5718
  editable-files:
  - txt
  - yml
  - json
  - properties
  - log
  # highlight-start
  users: []
  permissions: []
  # highlight-end
# [...]
```
</details>

<details>
  <summary>Error: `Cannot reach "192.168.2.1"`</summary>

  The App cannot reach the IP-Address or the domain with your specified port. Most likely the port is not accessible. Either you have to open the port (default `5718`) in your firewall or router if you are hosting the server yourself, ServerCtrl is communicating only through `TCP`. If you renting the minecraft server, please check with your hoster if you get additional ports for free. 
</details>

<details>
  <summary>Error: `Please accept the warning and login again`</summary>

  The HTTPS certificate is not trusted. Accept only if you first logging in or changed the certificate. [See more](/docs/guide/App#https)
</details>

<details>
  <summary>Error: `Something went wrong`</summary>

  The specified IP or domain can be accessed with the port but something still went wrong. Maybe the port you specified is not the port of ServerCtrl? It's default port is `5718`. **It's not your minecraft instance at port `25565`**
</details>