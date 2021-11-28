
call %toolDir%\bat\pre.bat %targetDir%\textContent.txt %targetDir%\setup.vlra
call %toolDir%\bat\main.bat %targetDir%\setup.vlra %targetDir%\source\source.vlra.txt %targetDir%\source\assemble.bat %targetDir%\source\message.log
exit /b
