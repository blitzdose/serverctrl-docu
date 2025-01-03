---
sidebar_label: '2 - Web interface'
---

# 2 - Web interface

This chapter will guide you through the necessary steps to get the web interface working.

After you installed the plugin, you may have to change some settings to access the web interface.

## Port

By default, the web server and interface is accessible through `https://minecraft.example.com:5718` (`minecraft.example.com` is your server domain or IP). If you need to change the port (`5718` by default) you can do that inside the file `/plugins/ServerCtrl/config.yml`. 

## HTTPS

By default, the web server and interface is using HTTPS. If you don't want HTTPS and instead access the web server and interface unencrypted you can disable the usage of HTTPS in the config file at `/plugins/ServerCtrl/config.yml`. 

HTTPS however, requires the server to provide a certificate to ensure an encrypted communication. The plugin will automatically generate a so called "self signed certificate". No device you use to access the web interface will trust this certificate by default. There are a few options to change this.

:::danger[**It is highly recommended to use HTTPS**] 

You should never use just HTTP communication unless you really know what you are doing. HTTPS is used to ensure an encrypted communication between you and the server. If you don't use it, you put your server at a high risk of getting hacked. This applies to the app as well as the web interface.
:::

### Temporarily trust the certificate

After you open the web interface you will probably get a message similar to the following:

<img
  src={require('./img/https1.png').default}
  alt="Connection is not secure"
  width="70%"
  style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', marginBottom: '0.5rem'}}
/>

You can click on `Proceed to minecraft.example.com (unsafe)` at the bottom to let your device temporarily trust the provided certificate. 

If the text at the bottom is missing, just click the `Advanced` button on the left. 

:::warning
You should use this option only to change the necessary settings for the next two options.
:::

### Add to trust store

To let your device trust that certificate permanently, you can add the certificate to the trust store of your device.

For this it is necessary to generate a new certificate with your correct data. To do this, choose the previous method to access the web interface. Then go to `settings > Generate new HTTPS certificate`. Now put in the IP-Address or domain you will use to access the web interface. After the certificate is generated, you have to restart your server. 

You can now install the file `/plugins/ServerCtrl/RootCA.cer` on all the devices you want to access the web interface from. For a detailed tutorial on how to do that, simply google "How to install a RootCA on [Device]" and replace [Device] with Android, Windows, Linux, MacOS, etc. Alternatively you can head over to the Discord server and ask for help.

### Get a proper certificate

To get the best security without the need to install a certificate on all devices you can simply get a proper certificate from e.g. [ZeroSSL](https://zerossl.com/) or LetsEncrypt. All you need is a domain, you can get a free subdomain on [dynu.com](https://www.dynu.com).

The following steps will show how to use ZeroSSL in combination with dynu.com to get a certificate:

#### 1. Create an account on dynu.com and zerossl.com

Head over to [dynu.com](https://www.dynu.com/en-US/ControlPanel/CreateAccount/) and create an account.

Head over to [ZeroSSL](https://zerossl.com/) and create an account there too.

#### 2. Add your domain

Go to `DDNS Services` (https://www.dynu.com/en-US/ControlPanel/AddDDNS), add a domain name of your choice and choose a Top Level you like. In this example I will be using `serverctrl` and `freeddns.org`. After you click _Add_, you can now set the IPv4 Address to the IP-Address of your server and click on _Save_.

#### 3. Request certificate

Login to ZeroSSL, go to `Certificates` and then `Create Certificate ->`. There you put in your previously created domain, in my case `serverctrl.freeddns.org`. You then need to choose the _90-Day Certificate_, no Add-Ons and leave the _Auto-Generate CSR_ option ticked. In the last step, choose the _Free_ plan.

#### 4. Verify your domain

After you clicked through the wizard, it is time to verify your domain to prove that this domain actually belongs to you. To do this, we will choose the option `DNS (CNAME)`. 

Now you copy the values shown under _Name_ (e.g. `_12345.serverctrl.freeddns.org`) and _Point To_ (e.g. `example.com`) and go back to dynu.com. There you click on _DNS Records_ and fill in the following information:

- **Node Name:** `Name` from ZeroSSL, **BUT just the part before your domain, in my case `_12345`** 
- **Type:** CNAME
- **TTL:** 120
- **Hostname:** `Point To` from ZeroSSL (_example.com_)

Then click _Add DNS Record_ to save, you should now see a new entry in the table below like this:

| Hostname                       | Type  | Data        | TTL |
| ------------------------------ | ----- | ----------- | --- |
| _12345.serverctrl.freeddns.org | CNAME | example.com | 120 |

Now you can go back to ZeroSSL and click on _Next Step_ and _Verify Domain_.

**If you get an error message, don't worry!** The update of the DNS records usually take a couple of minutes. Just wait 5-10 minutes and try again. If it's still not working, wait another 5 minutes. After around 20 minutes you can be pretty sure that you did something wrong.

#### 5. Install certificate

If your domain got verified successfully, you can download the necessary files. Please choose `Default Format` and click on _Download Certificate (.zip)_. After the file is downloaded, extract the zip archive, you should see three files in there: `ca_bundle.crt`, `certificate.crt` and `private.key`.

Now open the web interface and go to `Settings > Upload HTTPS certificate`. For the _Certificate file_ you will choose `certificate.crt` and for the _Certificate key file_ `private.key`.

After you uploaded both files, you will need to restart the server.

#### 6. Congratulations

You can now access the web interface through your chosen domain and port (e.g. https://serverctrl.freeddns.org:5718) in a secured way. I know these are quite a lot of steps but if you don't want your server to get hacked (That's not joke), you should do it.

:::tip
This is the recommended method and allows access from all your devices without configuring anything on them.
:::

## Other options

You can read more about the other configuration options under [Plugin Configuration](/docs/plugin-configuration/config.yml)