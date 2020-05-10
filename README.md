<h1 align="center">
  <img width="180" height="180" src="https://github.com/xtuJSer/CoCoMusic/blob/master/build/icons/256x256.png?raw=true">
  <br/>
  CoCoMusic
</h1>
<h3 align="center">Vue + Electron + <img src="http://mypic-10053031.cossh.myqcloud.com/-75720e06afe95850.jpg">  =  <img width="50" height="50" src="http://mypic-10053031.cossh.myqcloud.com/256x256.png"> </h3>
<p align="center">
<img src="https://img.shields.io/badge/build-passing-green.svg">
<img src="https://img.shields.io/badge/release-v2.0.2-brightgreen.svg">
<img src="https://img.shields.io/badge/license-LGPL-red.svg">
<br/>

</p>

# CoCoMusic Next
[v3](https://github.com/xtuJSer/CoCoMusic/commits/v3.0) 正在开发中，感谢 [pid000](https://github.com/pid000) 的贡献。

# Contributor
  
  Contributor:
 - [pid000](https://github.com/pid000)
 - [fengT-T](https://github.com/fengT-T)
 - [Noah Gao](https://github.com/noahziheng)

# Install
## Linux
### AppImage
``` bash
chmod +x cocomusic-2.0.4-x86_64.AppImage
./cocomusic-2.0.4-x86_64.AppImage
```
### deb

[第三方deb源](https://github.com/coslyk/debianopt-repo)
Debian用户可以加源后
```bash
sudo apt install cocomusic
```
```bash
sudo dpkg -i cocomusic_2.0.4_amd64.deb
```
### pacman
```bash
sudo pacman -U cocomusic-2.0.4.pacman
```

# Build Setup

``` bash
# install dependencies
npm install

# rebuild native module
./node_modules/.bin/electron-rebuild

# develop
npm run dev

# build electron application for production
npm run build:linux
npm run build:mac
npm run build:win
```
# Preview
![](http://cocomusic-1252075019.file.myqcloud.com/2png/Screenshot_20180818_005614.png)
![](http://cocomusic-1252075019.file.myqcloud.com/2png/Screenshot_20180818_005423.png)
![](http://cocomusic-1252075019.file.myqcloud.com/2png/Screenshot_20180818_005533.png)
![](http://cocomusic-1252075019.file.myqcloud.com/2png/Screenshot_20180818_005346.png)
![](http://cocomusic-1252075019.file.myqcloud.com/2png/Screenshot_20180818_005442.png)
