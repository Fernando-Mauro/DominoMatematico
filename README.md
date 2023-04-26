## Instalar el dominó matemático virtual en tu computadora
1.  Necesitas una laptop con un sistema operativo Windows o Linux instalado. Si no sabes qué sistema operativo tienes, puedes buscar en internet "cómo saber qué sistema operativo tiene mi laptop" y encontrarás diferentes guías que te pueden ayudar.
    
2.  Necesitas descargar e instalar Node, que es un programa que te permitirá ejecutar el Domino Matemático Virtual en tu laptop. Puedes descargar Node desde su sitio web oficial: [https://nodejs.org/es/](https://nodejs.org/es/). Busca la versión adecuada para tu sistema operativo (Windows o Linux), descarga el archivo de instalación y sigue las instrucciones que te dé el instalador.
    
3.  Necesitas descargar e instalar Git, que es un sistema de control de versiones que te permitirá descargar el código fuente del Domino Matemático Virtual desde internet. Puedes descargar Git desde su sitio web oficial: [https://git-scm.com/downloads](https://git-scm.com/downloads). Busca la versión adecuada para tu sistema operativo (Windows o Linux), descarga el archivo de instalación y sigue las instrucciones que te dé el instalador.
    
4.  Una vez que hayas instalado Git, debes abrir una aplicación llamada "terminal" en tu laptop. Esta aplicación te permitirá ejecutar comandos en tu laptop. En la terminal, escribe el siguiente comando y presiona "Enter":
    
    ```bash
    git --version
    ```
    
    Si Git se instaló correctamente, verás un mensaje que te muestra la versión de Git que tienes instalada.
    
5.  Después de instalar Git, necesitas descargar el código fuente del Domino Matemático Virtual desde internet. Para hacer esto, debes abrir la terminal de nuevo y escribir el siguiente comando y presionar "Enter":
    
    ```bash
	  git clone https://github.com/Fernando-Mauro/DominoVersatil.git
    ```
    
    Este comando descargará el código fuente del Domino Matemático Virtual y lo guardará en una carpeta en tu laptop.
    
6.  Una vez que hayas descargado el código fuente del Domino Matemático Virtual, necesitas instalar los paquetes que se requieren para ejecutar el programa. Para hacer esto, debes abrir la terminal de nuevo y navegar hasta la carpeta donde descargaste el código fuente del Domino Matemático Virtual. Una vez que estés dentro de esa carpeta, escribe el siguiente comando y presiona "Enter":
    
    ```bash 
    npm install
	```    
    Este comando descargará e instalará todos los paquetes necesarios para ejecutar el Domino Matemático Virtual.
    
7.  Finalmente, para ejecutar el Domino Matemático Virtual, debes escribir el siguiente comando en la terminal y presionar "Enter":
    
	   ```bash
    npm start
	```
    Si todo se ha instalado correctamente, deberías ver el Domino Matemático Virtual en tu navegador web al ingresar la ip de tu computadora.
    Para averiguar la dirección IP en Linux, puedes abrir una terminal y escribir el comando "ip addr show" o "ifconfig" y buscar la dirección IP asignada a la interfaz de red en la que estás conectado.

	Para Windows, puedes abrir el símbolo del sistema y escribir el comando "ipconfig" y buscar la dirección IP asignada a la interfaz de red en la que estás conectado.