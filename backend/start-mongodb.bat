@echo off
echo Starting MongoDB for Anbu Thaane Ellam Sethu project...

REM Check if MongoDB is already running
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo MongoDB is already running!
    goto :end
)

REM Try to start MongoDB service
echo Attempting to start MongoDB service...
net start MongoDB 2>NUL
if "%ERRORLEVEL%"=="0" (
    echo MongoDB service started successfully!
    goto :end
)

REM If service doesn't exist, try to start mongod directly
echo MongoDB service not found. Trying to start mongod directly...
echo Please make sure MongoDB is installed and mongod.exe is in your PATH
echo.
echo If MongoDB is not installed, please:
echo 1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
echo 2. Install it with default settings
echo 3. Add MongoDB bin directory to your PATH
echo.
echo Starting mongod with default settings...
start "MongoDB" mongod --dbpath "C:\data\db"

:end
echo.
echo MongoDB setup complete!
echo You can now run: npm run dev
pause