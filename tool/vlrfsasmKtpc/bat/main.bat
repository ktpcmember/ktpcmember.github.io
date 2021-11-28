
cd %tempDir%\vlrfsasm
vlrfsasm %~dpn1.html %targetDir%\log\main.log def\common.vlra %targetDir%\temp\textContent.vlra %toolDir%\rule.vlra %toolDir%\escape.vlra %toolDir%\le\lectureList.vlra %toolDir%\code\htmlEmbed.vlra %toolDir%\code\commonRule.vlra %toolDir%\code\pathRule.vlra %toolDir%\code\vlrfsasmRule.vlra %*
cd %targetDir%
exit /b
