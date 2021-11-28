
call %toolDir%\bat\pre.bat %CD%\textContent.txt
call %toolDir%\bat\main.bat %CD%\setup.vlra %CD%\source\source.vlra.txt %CD%\source\assemble.bat %CD%\source\message.log
exit /b
