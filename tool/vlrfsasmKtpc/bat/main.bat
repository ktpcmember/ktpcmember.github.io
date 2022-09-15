
cd %tempDir%\vlrfsasm
vlrfsasm %~dpn1.html %targetDir%\log\main.log def\common.vlra %targetDir%\temp\textContent.vlra %toolDir%\main\rule.vlra %toolDir%\main\escape.vlra %toolDir%\list\pageList.vlra %toolDir%\code\htmlEmbed.vlra %toolDir%\code\commonRule.vlra %toolDir%\code\pathRule.vlra %toolDir%\code\vlrfsasmRule.vlra %toolDir%\code\cRule.vlra %toolDir%\math\math.vlra %toolDir%\math\element.vlra %toolDir%\math\render.vlra %toolDir%\math\sizeList.bin %toolDir%\math\replaceList.bin %toolDir%\main\aliasList.txt %*
cd %targetDir%
exit /b
