@echo off
setlocal
cd /d "%~dp0"

echo ========================================
echo        APLYK GITHUB SYNC
echo ========================================
echo.

echo [1/4] Pulling latest changes...
git pull --rebase --autostash origin main
if errorlevel 1 goto ERROR

echo.
echo [2/4] Adding local changes...
git add -A

git diff --cached --quiet
if %errorlevel%==0 goto NOCHANGES

echo.
echo [3/4] Creating commit...
git commit -m "content: website sync"
if errorlevel 1 goto ERROR

echo.
echo [4/4] Pushing to GitHub...
git push origin main
if errorlevel 1 goto ERROR

echo.
echo ========================================
echo        SYNC COMPLETED
echo ========================================
pause
exit /b 0

:NOCHANGES
echo.
echo No changes to upload.
pause
exit /b 0

:ERROR
echo.
echo ========================================
echo        SYNC FAILED
echo ========================================
echo Check the error shown above.
pause
exit /b 1