'use strict';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let FS = require("fs");
let PATH = require("path");
let XMLHTTP = require("xmlhttprequest");

function codeblock_add_syntax_by_kutiki(os, i_pt, la, nrofsp) {
	//var i_pt = document.getElementById("i_pt").value;
	//var la = document.getElementById("la").value;
	//var nrofsp = document.getElementById("nrofsp").value;
	var ottt = "", sx, sxtn = new Array(4096), nrofsxtn = 0, r_qt, t, i, j, k, c, l, f, spt_r_pt = "";
	var wd = new Array(), pr = new Array(), cr = new Array(), ky = new Array();
	var p_vsty = "", ctty = "", cttn = "";
	var sk = new Array();
	var ostt;
	sk.push({ tg: "", sg: "", tt: false });
	r_qt = new XMLHTTP.XMLHttpRequest();
	r_qt.open("GET", "https://www.ktpc.tokyo/le/+tool/coq_ge/" + la + ".txt", false);
	r_qt.send(null);
	sx = r_qt.responseText;
	sxtn.fill("");
	i = 0;
	j = 0;
	do {
		c = sx.charAt(i);
		switch (c) {
			case "":
			case " ":
			case "\n":
			case "\r":
				if (j != nrofsxtn) {
					j++;
				}
				break;
			default:
				if (j == nrofsxtn) {
					nrofsxtn++;
				}
				sxtn[j] += c;
				break;
		}
		i++;
	} while (i <= sx.length);
	i = 0;
	while (i < nrofsxtn) {
		switch (sxtn[i]) {
			case "+":
				wd.push({
					na: sxtn[i + 1],
					cs: sxtn[i + 2]
				});
				i += 3;
				break;
			case "&":
				pr.push({
					lt: sxtn[i + 1],
					rt: sxtn[i + 2],
					sp: false
				});
				i += 3;
				break;
			case "|":
				pr.push({
					lt: sxtn[i + 1],
					rt: sxtn[i + 2],
					sp: true
				});
				i += 3;
				break;
			case "-":
				switch (sxtn[i + 1]) {
					case "EOF":
						sxtn[i + 1] = "";
						break;
					case "NL":
						sxtn[i + 1] = "\n";
						break;
					case "TAB":
						sxtn[i + 1] = "\t";
						break;
					case "SP":
						sxtn[i + 1] = " ";
						break;
				}
				cr.push({
					na: sxtn[i + 1],
					wd: sxtn[i + 2]
				});
				i += 3;
				break;
			case "!":
				ky.push({
					p_vswd: sxtn[i + 1],
					na: sxtn[i + 2],
					ntwd: sxtn[i + 3]
				});
				i += 4;
				break;
			default:
				i++;
		}
	}
	if (i_pt.charCodeAt(0) == 0xFEFF) {
		i = 1;
	} else {
		i = 0;
	}
	do {
		l = 1;
		for (j = Math.min(4, i_pt.length - i); 0 < j; j--) {
			c = i_pt.substring(i, i + j);
			for (k = 0; cr.length > k; k++) {
				if (cr[k].na == c) {
					l = j;
					break;
				}
			}
			if (cr.length != k) break;
		}
		if (j == 0) {
			ctty = "?";
			c = i_pt.charAt(i);
			if (c == "") {
				for (j = 0; cr.length > j; j++) {
					if (cr[j].na == c) break;
				}
				if (cr.length == j) {
					ctty = "";
				} else {
					ctty = cr[j].wd;
				}
			}
		} else {
			ctty = cr[k].wd;
		}
		f = false;
		for (j = 0; pr.length > j; j++) {
			if ((pr[j].lt == p_vsty) && (pr[j].rt == ctty)) {
				if (pr[j].sp) {
					f = true;
				}
				ctty = p_vsty;
				break;
			}
		}
		if (f) {
			cttn += c;
			ctty = gtky(ky, ctty, cttn);
			gttt(wd, ctty, cttn, sk);
			cttn = "";
			ctty = "";
		} else if ((pr.length == j) && (cttn != "")) {
			p_vsty = gtky(ky, p_vsty, cttn);
			if (gttt(wd, p_vsty, cttn, sk) && (c == "\n")) {
				cttn = "\\\n";
			} else {
				cttn = c;
			}
		} else {
			cttn += c;
		}
		p_vsty = ctty;
		i += l;
	} while (i_pt.length >= i);
	if (sk[sk.length - 1].tt) {
		t = sk.pop();
		sk[sk.length - 1].sg += '<span class="' + t.tg + '">' + t.sg + '</span>';
	}
	ottt += sk[0].sg;
	if (nrofsp > 0) {
		for (nrofsp; nrofsp > 0; nrofsp--) {
			spt_r_pt += " ";
		}
		ottt = ottt.replace(/\t/g, spt_r_pt);
	}
	if (os == 0) {
		ottt = '<span class="cb62">' + ottt + '</span>';
		ostt = "multi-line";
	} else {
		ostt = "single-line";
	}
	//document.getElementById("o_pt").value = ottt;
	//navigator.permissions.query({
	//	name: "clipboard-write"
	//});
	//navigator.clipboard.writeText(ottt).then(
	//	function () {
	//		alert("Copied for " + ostt);
	//	},
	//	function () {
	//		alert("Failed to_dir copy...");
	//	}
	//);
	return ottt;
}

function gtky(ky, ty, tn) {
	var i, m;
	for (i = 0; ky.length > i; i++) {
		if ((ky[i].p_vswd == ty) && (ky[i].na == tn)) {
			m = ky[i].ntwd;
			break;
		}
	}
	if (ky.length == i) {
		m = ty;
	}
	return m;
}

function gttt(wd, ty, tt, sk) {
	var i, a, m = "", t, f = false;
	for (i = 0; wd.length > i; i++) {
		if (wd[i].na == ty) {
			a = wd[i].cs;
			break;
		}
	}
	tt = tt.split("&").join("&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\\\n/g, '<span style="display:none">\n</span>');
	if ((a == "PGS") || (a == "PGE")) {
		if (sk[sk.length - 1].tt) {
			t = sk.pop();
			sk[sk.length - 1].sg += '<span class="' + t.tg + '">' + t.sg + '</span>';
		}
		if (a == "PGS") {
			sk.push({ tg: tt.slice(2), sg: "", tt: false });
		} else {
			t = sk.pop();
			if (t.sg != "") {
				m = '<span class="pagh ' + t.tg + '"><span class="paghco">' + t.sg + '</span>';
				if (tt.length > 2) {
					m += '<span class="paghna"><span class="paghti"><span style="display:none;">{{</span>' + tt.slice(2) + '<span style="display:none;">}}</span></span></span>';
				} else {
					m += '<span style="display:none;">{{}}</span>';
				}
				m += '</span>';
				f = true;
			}
		}
	} else {
		if (!sk[sk.length - 1].tt) {
			sk.push({ tg: "paghco", sg: "", tt: true });
		}
		if ((wd.length == i) || (a == "*")) {
			m = tt;
		} else {
			m = '<span class="' + a + '">' + tt + '</span>';
		}
	}
	sk[sk.length - 1].sg += m;
	return f;
}

// root。下にあるテンプレート文字列のリプレースホルダーから別の関数を呼び出す実装をしてる。
function root(file) {
	//let obj = /(^<meta>.*?<\/meta>)|(^<header>.*?<\/header>)|(^<main>.*?<\/main>)/ms.exec(file);

	let string = file.toString().replace(/\r\n/g, "\n");

	// main、header、mainセクションの正規表現
	let meta_s = /^<meta>.*?<\/meta>/ms.exec(string)[0];
	let header_s = /^<header>.*?<\/header>/ms.exec(string)[0];
	let main_s = /^<main>.*?<\/main>/ms.exec(string)[0];

	// String.raw忘れるとリプレースホルダーでエスケープ処理されちゃうのでバグる。注意して。
	return String.raw`<!DOCTYPE html>
<html>
 <head>
  <meta charset="UTF-8">
  <meta http-equiv="content-language" content="ja">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <meta name="author" content="駒場東邦物理部">
${meta(meta_s)}
  <link rel="icon" type="image/jpeg" href="${(PATH.relative(to_dir, PATH.join(ktpc_root, "images/logo.jpg")))}">
  <link rel="stylesheet" type="text/css" href="${(PATH.relative(to_dir, PATH.join(ktpc_root, "style.css")))}">
  <link rel="stylesheet" type="text/css" media="(max-width:800px)" href="${(PATH.relative(to_dir, PATH.join(ktpc_root, "static.css")))}">
  <script type="text/javascript" src="${(PATH.relative(to_dir, PATH.join(ktpc_root, "header.js")))}"></script>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-133906591-2"></script>
  <script>
   window.dataLayer = window.dataLayer || [];
   function gtag(){dataLayer.push(arguments);}
   gtag('js', new Date());
   gtag('config', 'UA-133906591-2');
  </script>
 </head>
 <body>
  <header class="ch00">
   <img class="ch11" src="${(PATH.relative(to_dir, PATH.join(ktpc_root, "images/br.jpg")))}">
  </header>
  <div class="chb">
   <div class="ch01">
    <div class="ch10">
     <div class="ch21">
      <button type="button" class="ch31" onclick="ck()">
       <img class="ch42" src="${(PATH.relative(to_dir, PATH.join(ktpc_root, "images/menu.png")))}">
      </button>
     </div>
     <div id="hnmu" class="ch22" style="display: none; pointer-events:none;">
      <div class="ch32">
       <span class="ch40">
        <span class="ch50">駒場東邦物理部</span>
       </span>
       <a class="ch41" href="${(PATH.relative(to_dir, PATH.join(ktpc_root, "index.html")))}">
        <span class="ch50">トップページ</span>
       </a>
       <a class="ch41" href="${(PATH.relative(to_dir, PATH.join(ktpc_root, "le/le.html")))}">
        <span class="ch50">講習トップ</span>
       </a>
      </div>
${header(header_s)}
     </div>
    </div>
   </div>
   <div class="cb00">
    <div class="cb10">
${main(main_s)}
    </div>
   </div>
   <footer class="cf00">
    <div class="cf10">
     <button class="cf21" onclick="tp()">
      <img class="cf30" src="${(PATH.relative(to_dir, PATH.join(ktpc_root, "images/top.png")))}">
     </button>
     <span class="cf20">
      (C) 2020 駒場東邦物理部[KTPC]
     </span>
    </div>
   </footer>
  </div>
 </body>
</html>
`
}

// metaセクション
// call_from : root
function meta(str) {
	// パラメータの文字列連結用関数。「=」「+=」の判定はここでしてくれるので。
	// op : 演算子のところの文字列
	function adoras(op, bef, aft, ret) {
		switch (op) {
			case "=":
				if (ret) {
					return bef;
				} else {
					return aft;
				}
			case "+=":
				return bef + aft;
			default:
				return bef;
		}
	}

	// オブジェクトに変えちゃった方がエレガントなのかもしれない
	// keywords、description文の正規表現
	let keywords = /^keywords[^\S\n]*(=|\+=)[^\S\n]*"(.*?)"/ms.exec(str),
		description = /^description[^\S\n]*(=|\+=)[^\S\n]*"(.*?)"/ms.exec(str),
		title = /^title[^S\n]*(=|\+=)[^\S\n]*"(.*?)"/ms.exec(str);

	// String.raw忘れるt(ry
	return String.raw`  <meta name="keywords" content="${adoras(keywords[1], `駒場東邦物理部,駒場東邦,駒東,KTPC,物理部,プログラミング,講習`, keywords[2], false)}">
  <meta name="description" content="${adoras(description[1], ``, description[2], false)}">
  <title>${adoras(title[1], title[2], ` - 駒場東邦物理部`, true)}</title>`;
}

// headerセクション
// call_from : root
function header(str) {
	// name、top、before、next、index文の正規表現
	let name = /^name[^S\n]*=[^\S\n]*"(.*?)"/ms.exec(str),
		top = /^top[^\S\n]*=[^\S\n]*"(.*?)"/ms.exec(str),
		before = /^before[^\S\n]*=[^\S\n]*"(.*?)"/ms.exec(str),
		next = /^next[^\S\n]*=[^\S\n]*"(.*?)"/ms.exec(str),
		index = /^index[^\S\n]*=[^\S\n]*"(.*?)"/ms.exec(str);

	// String.rawわs(ry
	return String.raw`      <div class="ch32">
       <span class="ch40">
        <span class="ch50">${name[1]}</span>
       </span>
       <a class="ch41" href="${PATH.relative(to_dir, PATH.join(ktpc_root, top[1]))}">
        <span class="ch50">目次</span>
       </a>
       <a class="ch41" href="${PATH.relative(to_dir, PATH.join(ktpc_root, index[1]))}">
        <span class="ch50">索引</span>
       </a>
       <a class="ch41" href="${PATH.relative(to_dir, PATH.join(ktpc_root, before[1]))}">
        <span class="ch50">前回</span>
       </a>
       <a class="ch41" href="${PATH.relative(to_dir, PATH.join(ktpc_root, next[1]))}">
        <span class="ch50">次回</span>
       </a>
      </div>`;
}

// mainセクション
// call_from : root
function main(str) {
	// コードブロック処理
	function codeblock(str, mode) {
		function cpp_codeblock(str) {
			// 改行が無いとき（シングルライン）はtrue（!=0）を第一引数に
			// 改行がある時（マルチライン）はfalse（=0）を第一引数に
			return codeblock_add_syntax_by_kutiki(-1 === str.indexOf("\n"), str, "_cps", 4);
		}

		function ktpcpicasm_codeblock(str) {
			return codeblock_add_syntax_by_kutiki(-1 === str.indexOf("\n"), str, "ktpcpicasm", 4);
		}

		function cmd_codeblock(str) {
			return text(str);
		}

		function syntax_codeblock(str) {
			return text(str);
		}

		// モード振り分け
		switch (mode) {
			case "cpp":
				return cpp_codeblock(str);
				break;
			case "cmd":
				return cmd_codeblock(str);
				break;
			case "ktpcpicasm":
				return ktpcpicasm_codeblock(str);
				break;
			case "syntax":
				return syntax_codeblock(str);
				break;
		}
	}

	// 改行のエスケープとか、大なり小なりのエスケープとか。要するにhtmlのエスケープ処理をする奴。
	// ついでに太字とコード（インライン要素）とかルビとかも処理してる
	function text(str) {
		return str
			.replace(/&/msg, "&amp;")
			.replace(/>/msg, "&gt;")
			.replace(/</msg, "&lt;")
			.replace(/"/msg, "&quot;")
			.replace(/'/msg, "&#39;")
			.replace(/ /msg, "&nbsp;")
			.replace(/ \\\n/msg, "")
			.replace(/\n/msg, "<br>")
			.replace(/(?<!\\)\*{2}(.+?)\*{2}/msg, "<b>$1</b>").replace(/\\\*{2}/msg, "**")
			.replace(/(?<!\\)`(.+?)`/msg, "<code>$1</code>")
			.replace(/(?<!\\)\[((?:(?:[^\]])|(?:\\\]))+?)\](?<!\\)\(((?:(?:[^\)])|(?:\\\)))+?)\)/msg, "<ruby><rb>$1</rb><rp>（</rp><rt>$2</rt><rp>）</rp></ruby>");
	}

	// 右、左表
	// 右表と左表を統合して一つの関数としている仕様上、
	// booleanで必要かどうかを判定して生成している事に注意。
	// strary : 正規表現でマッチしたことはもちろん、LFでsplitされた文字列
	function table(strary) {
		let left = "",	// -
			right = "",	// +
			left_title = "",	// *-
			right_title = "";	// *+

		let unavailable1 = "unavailable"; // 要素が無いとき、要するに「{}」だった時に入れるやつ。
		let unavailable2 = "今回はありません"; // タイトルしかないときの本体に入れるやつ。

		// 表の正規表現は複雑なので、クロシ―ジャで生成する
		// 表は一行ごとに一要素（タイトルもしくは見出しとその説明）があるので、その規則に合っている行を抽出する正規表現
		const regary = function () {
			const all = String.raw`.`;
			const normal = String.raw`\S`;
			const non_lf = String.raw`[^\n]`;
			const non_lf_s = String.raw`[^\S\n]`;

			const table_item_holder = String.raw`{${non_lf}*}|${normal}+`;
			const table_title = String.raw`(?:^(?<title_tag>(?:\*\+)|(?:\*-))(?:${non_lf_s}+)(?<title>${normal}${non_lf}*))`;
			const table_item = String.raw`(?<item_tag>^(?:\+|-))(?:${non_lf_s}+)(?<word>${table_item_holder})(?:${non_lf_s}+)(?<desc>${table_item_holder})`;
			const table = String.raw`${table_title}|${table_item}`;

			return table;
		}();

		// {}表記の場合、それを外さないと行けないので外す、エスケープなんてない。後でエスケープを用意するかもしれない
		function deesc(str) {
			let r = /^{.*(?<!\\)}$/ms;
			return ((r.test(str)) ? (str.slice(1, str.length - 1) || unavailable1) : (str));
		}

		//console.log(regary);

		// 左表、右表がそれぞれ存在しているか
		let need_left = false, need_right = false;

		let r = new RegExp(regary, "ms");

		// 一行ごとに処理してく
		for (let ele of strary) {

			// 表の要素に適合してるかチェック
			let res = r.exec(ele);

			// 適合してた時だけ
			if (res != null) {
				// キャプチャグル―プに短縮名付けておく
				let g = res.groups;

				if (g.item_tag != null) {
					// 要素の時
					let s = String.raw`       <h4 class="cb45">
        ${text(deesc(g.word))}
       </h4>
       <span class="cb41">
        ${text(deesc(g.desc))}
       </span>
`;
					switch (g.item_tag) {
						case "+":
							need_right = true;
							right += s;
							break;
						case "-":
							need_left = true;
							left += s;
							break;
					}
				} else if (g.title_tag != null) {
					// タイトルの時

					switch (g.title_tag) {
						case "*+":
							need_right = true;
							right_title = text(g.title);
							break;
						case "*-":
							need_left = true;
							left_title = text(g.title);
							break;
					}
				}
			}
		}

		// 表を二つ並べる時は必要/重要語の表の仕様、一つの時は独自仕様
		// 二つの時 cb21 fxlr tntwfg, cb36 debr
		// 一つの時 cb21 fxlr, tnonfg debr
		const table_direction = (need_left ^ need_right) ? "tnonfg" : "cb36";

		const left_base =
			need_left
				? // 左表が必要な時
				String.raw`<div class="${table_direction} debr">
       <h4 class="cb44">
        ${left_title || unavailable1}
       </h4>
${left || unavailable2}
      </div>
`
				:
				``;

		const right_base =
			need_right
				? // 右表が必要な時
				String.raw`<div class="${table_direction} debr">
       <h4 class="cb44">
        ${right_title || unavailable1}
       </h4>
${right || unavailable2}
      </div>
`
				:
				``;

		return (need_left ^ need_right)
			? // 表が一つしかない時
			`     <article class="cb21 fxlr">
      <div class="cb31">
${left_base}
${right_base}
      </div>
     </article>
`
			: // 表が二つある時
			`     <article class="cb21 fxlr tntwfg">
${left_base}
${right_base}
     </article>
`;
	}

	// コードブロックの「copy」の番号を付けるためのクロシージャ
	let codenum = function () {
		// 変数"a"を初期化
		let a = -1;

		// 処理内容の（外側でtest関数になる）無名関数を返す
		return function () {
			// 変数"a"をカウントアップ
			++a;

			// 変数"a"の値を返す
			return a;
		};
	}();

	//ブロックに分解

	// 上の方で表の正規表現の定義、aryでそれぞれ
	const regary = function () {
		const all = String.raw`.`;
		const normal = String.raw`\S`;
		const non_lf = String.raw`[^\n]`;
		const non_lf_s = String.raw`[^\S\n]`;
		const not_esc = String.raw`(?<!\\)`;

		const table_item_holder = String.raw`{${non_lf}*}|${normal}+`;
		const table_title = String.raw`(?:^(?:(?:\*\+)|(?:\*-))(?:${non_lf_s}+)(?:${normal}${non_lf}*)\n)`;
		const table_item = String.raw`(?:^(?:\+|-)(?:${non_lf_s}+)(?:${table_item_holder})(?:${non_lf_s}+)(?:${table_item_holder})\n)`;
		const table = String.raw`(?<table>(?:${table_title}|${table_item})+)\n`;

		// h1 タイトル
		// h2 青
		// h3 白
		// drpdwn1 折り畳み段落
		// drpdwn2 折り畳みコード
		// cb コード
		const ary = [
			String.raw`(?:^(?<h1>#)${non_lf_s}+(?<h1_t>${non_lf}*?)\n{2})`,
			String.raw`(?:^(?<h2>#{2})${non_lf_s}+(?<h2_t>${non_lf}*?)\n(?<h2_m>${all}*?)\n{2})`,
			String.raw`(?:^(?<h3>#{3})${non_lf_s}+(?<h3_t>${non_lf}*?)\n(?<h3_m>${all}*?)\n{2})`,
			String.raw`(?:^(?<drpdwn1>@)${non_lf_s}+(?<drpdwn1_t>${non_lf}*?)\n(?<drpdwn1_m>${all}*?)\n{2})`,
			String.raw`(?:^(?<drpdwn2>@\`{2})(?<drpdwn2_m>${normal}*?)${non_lf_s}+(?<drpdwn2_t>${non_lf}*?)\n(?<drpdwn2_p>${all}*?)\`{3}\n{2})`,
			String.raw`(?:^(?<cb>\`{3})(?<cb_m>${normal}*?)${non_lf_s}+(?<cb_t>${non_lf}*?)\n(?<cb_p>${all}*?)\`{3}\n{2})`,
			String.raw`(?:${table})`
		];

		return ary.join("|");
	}();

	//console.log(regary);

	// matchAllで全てマッチして配列で保持する。順序は維持されるのでfor ofで回す。
	let obj = str.matchAll(new RegExp(regary, "msg"));

	let s = "";
	for (let ele of obj) {
		let groups = ele.groups;
		if (groups.h1 != null) {
			// タイトル
			s += String.raw`     <article class="cb20 fxtb">
      <h1>${groups.h1_t}</h1>
     </article>
`;
		} else if (groups.h2 != null) {
			// 青
			s += String.raw`    <article class="cb21 fxtb">
     <h2 class="cb33">${text(groups.h2_t)}</h2>
      <span class="cb34">
       ${text(groups.h2_m)}
      </span>
     </article>
`;
		} else if (groups.h3 != null) {
			// 白
			s += String.raw`     <article class="cb21">
      <div class="cb31">
       <h3 class="cb40">${text(groups.h3_t)}</h3>
        <span class="cb41">
         ${text(groups.h3_m)}
        </span>
      </div>
     </article>
`;
		} else if (groups.drpdwn1 != null) {
			// 隠れる(文字)
			s += String.raw`     <article class="cb21">
      <details class="cb37">
       <summary class="cb48">${text(groups.drpdwn1_t)}</summary>
       <span class="cb41">
        ${text(groups.drpdwn1_m)}
       </span>
      </details>
`;
		}
		else if (groups.drpdwn2 != null) {
			// 隠れる(コード)
			let num = codenum();
			s += String.raw`     <article class="cb21">
      <div class="cb31">
       <details class="cb37">
        <summary class="cb48">${text(groups.drpdwn2_t)}</summary>
        <div class="cb46">
        <span class="cb54">${groups.drpdwn2_t}</span>
        <button type="button" class="cb53" onclick="copy('${num}')">
         <span class="cb61">COPY</span>
        </button>
       </div>
       <code class="cb47">
<pre id="${num}" class="cb55 bkgdbl">
${codeblock(groups.drpdwn2_p, groups.drpdwn2_m)}
</pre>
       </code>
       </details>
     </article>
`;
		}
		else if (groups.cb != null) {
			// コードブロック単体
			let num = codenum();
			s += String.raw`      <article class="cb21 fxrl">
        <div class="cb37">
         <div class="cb46">
          <span class="cb54">${groups.cb_t}</span>
          <button type="button" class="cb53" onclick="copy('${num}')">
           <span class="cb61">COPY</span>
          </button>
         </div>
         <code class="cb47">
<pre id="${num}" class="cb55 bkgdbl">
${codeblock(groups.cb_p, groups.cb_m)}</pre>
         </code>
        </div>
       </article>
`;
		} else if (groups.table != null) {
			s += table(groups.table.split(/\n/g));
		}
	}

	return s;
}

let ktpc_root = process.argv[2];
let from_file = process.argv[3];
let argv4 = process.argv[4], to_dir, to_file;
if (PATH.parse(argv4).ext == null) {
	to_dir = argv4;
	to_file = PATH.join(argv4, PATH.parse(from_file).name + ".html")
} else {
	to_dir = PATH.parse(argv4).dir;
	to_file = argv4;
}

FS.writeFileSync(to_file, root(FS.readFileSync(from_file), "utf8"), "utf8");