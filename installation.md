# This is a installation guide


# Clone the source code of OrderTable 


git clone https://github.com/fusumwan/ordertable.git

cd /.../ordertable





# Install Nodejs intoto Mac

Download the macOS Installer directly from the nodejs.org web site.

If you want to download the package with bash:

curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
Alternatives

Using Homebrew:

brew install node
Using MacPorts:

port install nodejs<major version>


port install nodejs7
Using pkgsrc:

Install the binary package:

pkgin -y install nodejs
Or build manually from pkgsrc:

cd pkgsrc/lang/nodejs && bmake install


# Install Mysql to Mac

The package is located inside a disk image (.dmg) file that you first need to mount by double-clicking its icon in the Finder. It should then mount the image and display its contents.


To install MySQL using the package installer:

Download the disk image (.dmg) file (the community version is available here https://dev.mysql.com/downloads/mysql/) that contains the MySQL package installer. Double-click the file to mount the disk image and see its contents.



Double-click the MySQL installer package from the disk. It is named according to the version of MySQL you have downloaded. For example, for MySQL server 5.7.37 it might be named mysql-5.7.37-macos-10.13-x86_64.pkg.

The initial wizard introduction screen references the MySQL server version to install. Click Continue to begin the installation.


The MySQL community edition shows a copy of the relevant GNU General Public License. Click Continue and then Agree to continue.

From the Installation Type page you can either click Install to execute the installation wizard using all defaults, click Customize to alter which components to install (MySQL server, Preference Pane, Launchd Support -- all enabled by default).

Click Install to begin the installation process.

After a successful installation, the installer displays a window with your temporary root password. This cannot be recovered so you must save this password for the initial login to MySQL. 





# Database Setting


cd /..../ordertable/database

mysql --host=127.0.0.1 --user=root --password=[your password] < ordertable.sql
mysql --host=127.0.0.1 < ordertable.sql
mysql.server start


///we haven't use mysql password///

mysql mysql -u root -p



# Website Setting

First you need to get a Google map api key free for testing
https://developers.google.com/maps/documentation/embed/get-api-key


cd /.../ordertable

Update the username and password in app.js:


var dbConnectionPool =mysql.createPool({host:'localhost',user:'root',password:'Your password',database:'ordertable'});

vi /.../ordertable/public/map.html

Update the Google map api key in map.html

 <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAgqnuVOIAWBir59PDbdngDm2WNZUHlMAI&callback=initMap" type="text/javascript"></script>





npm start;


http://localhost:3000




