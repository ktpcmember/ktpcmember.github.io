
echo %targetDir%\log\pre.log
cd %tempDir%\vlrfsasm
vlrfsasm %targetDir%\temp\textContent.vlra %targetDir%\log\pre.log def\common.vlra %toolDir%\preprocess.vlra %toolDir%\escape.vlra %1 > %targetDir%\log\pre.log
cd %targetDir%
exit /b
