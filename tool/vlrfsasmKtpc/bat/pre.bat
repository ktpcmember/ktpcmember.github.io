
echo %targetRoot%\log\pre.log
cd %tempDir%\vlrfsasm
vlrfsasm %targetRoot%\temp\textContent.vlra %targetRoot%\log\pre.log def\common.vlra %toolDir%\preprocess.vlra %toolDir%\escape.vlra %1
cd %targetDir%
exit /b
