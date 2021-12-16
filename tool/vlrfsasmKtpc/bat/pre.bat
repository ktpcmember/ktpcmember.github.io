
cd %tempDir%\vlrfsasm
vlrfsasm %targetDir%\temp\textContent.vlra %targetDir%\log\pre.log def\common.vlra %toolDir%\main\preprocess.vlra %toolDir%\main\escape.vlra %targetDir%\vkhc.txt
cd %targetDir%
exit /b
