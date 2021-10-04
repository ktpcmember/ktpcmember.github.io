
@rem @pushd ..\..\..\vlrfsasm
@rem vlrfsasm ..\ktpcmember.github.io\le\vlrfsasm\test.html ..\ktpcmember.github.io\le\vlrfsasm\test.txt ..\ktpcmember.github.io\le\vlrfsasm\rule.txt ..\ktpcmember.github.io\le\vlrfsasm\lectureList.txt def\common.txt
@rem @popd

@pushd tool\vlrfsasm
vlrfsasm ..\le\vlrfsasm\test.html ..\le\vlrfsasm\test.txt ..\le\vlrfsasm\rule.txt ..\le\vlrfsasm\lectureList.txt def\common.txt
@popd
