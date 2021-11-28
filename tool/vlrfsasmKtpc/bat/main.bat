
cd %tempRoot%\vlrfsasm
echo %CD%
vlrfsasm %~dpn1.html %targetRoot%\log\main.log def\common.vlra %targetRoot%\temp\textContent.vlra %toolDir%\rule.vlra %toolDir%\escape.vlra %toolDir%\le\lectureList.vlra %toolDir%\code\htmlEmbed.vlra %toolDir%\code\commonRule.vlra %toolDir%\code\pathRule.vlra %toolDir%\code\vlrfsasmRule.vlra %*
cd %targetDir%
exit /b
