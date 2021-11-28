
@set sourceFolder=%CD%
@cd ..\assembler
start vlrfsasm %sourceFolder%\result.txt %sourceFolder%\message.log %sourceFolder%\source.vlra def\common.vlra
