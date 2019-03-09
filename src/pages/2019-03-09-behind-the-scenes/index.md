---
path: '/behind-the-scenes'
date: '2019-03-09T09:00:00'
title: 'Behind the scenes'
tags: ['deployment', 'networking', 'tooling']
---

I want to try to write blog posts about things that I know now that I would have liked to have known before I knew what I now know (or TTIKNTIWHLTHKBIKWINK for short). One of those things is how to get a website onto the internet once you have finished creating it. It seems like there are an endless amount of resources about how to make a website, but when I was searching for articles about how to launch it once it was made, I seemed to only find adverts for hosting companies.

When I first starting learning how to develop websites and web applications I used an [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol) client to transfer my files from my computer onto the server. This worked well enough, but because I didn't understand what was happening after I clicked the upload button I was only ever able to host one website and use one domain. I ended up buying a resellers hosting package and setting up a different CPanel for each site; it works but it's not the cheapest or way to do it!

It turns out that there are a lot of different ways to get your website onto the internet. The most popular one at the moment seems to be [Netlify](https://www.netlify.com/) who pull your code from your source control repository, build and deploy it for you at the press of a button (or push to a branch!). Because there are a lot of different ways to achieve the same outcome, I thought it might be interesting to write a post about how I get this website onto the web.

First, I should explain the reason I don't use Netlify, or any other service like it. Because I'm interested in computers and now work professionally as a developer, I would be passing up on a great opportunity to learn about a number of different tools which are relevant to my job. If you just want get a website online to advertise your business then it's great that there are companies who can manage the technical side of things for you. If, however, you're intending on working as a web developer, it's a worthwhile exercise learning how to do it for yourself.

## The Server

I rent a VPS (Virtual Private Server) from a hosting company. A VPS is a virtual machine which is running on a physical server, this physical server runs a number of virtual servers which are all separated from one another using a piece of software called a hypervisor. Using a VPS is good because it is a lot cheaper than renting a dedicated server and it scales easily. This means you can start with a basic plan and then buy more memory or better performance if and when you need to. You also get full root access to your VPS which is something you don't get with shared hosting, meaning you can install whatever you want and add extra users should you want to.

I connect to the server via [SSH](https://en.wikipedia.org/wiki/Secure_Shell), I don't want to go into talking about how SSH works here because there are plenty resources available already and it's pretty simple to use, but very basically it allows you to tunnel through to your server from a terminal so you can interact with it as if it were your own computer.

## NGINX

In order to host a website you need to install some web server software. There are only really two contenders in this arena, [NGINX](https://www.nginx.com/) (pronounced "engine-x") and [Apache](https://www.apache.org/). I use NGINX, for no other reason than it's what we use where I work so I'm more familiar with it. NGINX listens for requests on ports 80 ([HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)) and 443 ([HTTPS](https://en.wikipedia.org/wiki/HTTPS)) and, in it's most basic form, serves files back to the requesting IP address from a directory on the filesystem. By default, NGINX will serve files in the `/var/www/html/` folder but you can set it to serve files from anywhere, this is important if you want to serve more than one site from your server.

NGINX configuration files are normally found in `/etc/nginx/sites-available/`. You can create and edit files in this folder but they will have no effect until they are moved to `/etc/nginx/sites-enabled`. The easiest way to do this is to symlink the files that you want to be picked up from the `sites-available` to the `sites-enabled` folder (I've added symlinking to my [bash tips](/bash-tips) blog post). Doing it this way means you can delete the symlink in the `sites-enabled` folder to stop serving the site without losing your configuration file. Any time you edit/add/remove a configuration file you will need to restart NGINX to see the changes, on newer versions of Ubuntu this is done by typing `sudo systemctl reload nginx`.

In my NGINX configuration file there is a server block which looks like this:
```
server {
  server_name hellocode.dev www.hellocode.dev;
  root /home/hcuser/websites/blog/;
}
```
NGINX looks at the "Host" header field on each request that comes in and matches the `server_name` values with it. This is how it is possible to point more than one domain at an IP address and serve different websites from the same server. Here, it is looking for `hellocode.dev` or `www.hellocode.dev`, if it matches then it serves the files found at `/home/hcuser/websites/blog`.

Before I bought the _hellocode.dev_ domain I was serving this site from `blog.thorning.ovh`. Because I still want people to be able to find the blog even if they use the old domain, I have a second NGINX configuration file which redirects any users attempting to visit it:
```
server {
  server_name blog.thorning.ovh;
  rewrite ^/(.*)$ https://hellocode.dev/$1 permanent;
```
This file matches the URL and rewrites it. The bit in parentheses is a regex (short for [regular expression](https://en.wikipedia.org/wiki/Regular_expression)) capture group which, as its name suggests, captures any characters following the `/` which are then added in place of `$1`. This adds the path to the redirected address so if, for example, you tried to visit `https://blog.thorning.ovh/bash-tips` you will be redirected to `https://hellocode.dev/bash-tips`. The keyword `permanent` makes NGINX return a 301 response code which lets browsers and search engines know this is a permanent redirection. If it is not a permanent redirection then you can use`temporary` to return a 302 response so that browsers and search engines know to continue attempting to request the original URL.

## Certbot


