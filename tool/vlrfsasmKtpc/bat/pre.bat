
cd %tempDir%\vlrfsasm
vlrfsasm %targetDir%\temp\textContent.vlra %targetDir%\log\pre.log def\common.vlra %toolDir%\main\preprocess.vlra %toolDir%\main\escape.vlra %1
cd %targetDir%
exit /b
