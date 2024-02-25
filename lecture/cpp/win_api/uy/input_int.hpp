#pragma once

#include <Windows.h>
#include <string>

#include <stdexcept>

/*
* 目的：int値をエディットコントロールによって入力出来るinput関数を定義します
* 仕様：input関数の返り値が入力された値
* 　　：ハイフンを付けるとマイナス値になる
* 使用：エディットコントロールに入力後、Enterキーか下のボタンをクリックします
*/
namespace winput {
	using string = std::wstring;

	/*
	* 目的：引数に渡したエディットコントロールの文字列を取得して返却します
	* 条件：引数は有効なエディットコントロールであること
	* 例外：ごく稀にメモリアロケートで送出される可能性があります
	*/
	string get_edittext(HWND edit) {
		string buffer;

		buffer.resize(GetWindowTextLength(edit) + 1);
		GetWindowText(edit, &buffer[0], buffer.size());
		buffer.pop_back();

		return buffer;
	}

	LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, WPARAM wp, LPARAM lp);

	/*
	* inst		：インスタンスハンドル
	* main		：メインウィンドウのハンドル
	* edit		：コントロール・エディットのハンドル
	* button	：コントロール・ボタンのハンドル
	* t_static	：コントロール・スタティックのハンドル
	* main_wc	：メインウィンドウのウィンドウクラス
	* size		：メインウィンドウのクライアント領域サイズ
	*/
	namespace win_data {
		HINSTANCE inst = GetModuleHandle(NULL);
		HWND main, edit, button, t_static;
		constexpr int edit_num = 2, button_num = 3, t_static_num = 4;
		WNDCLASS main_wc{
			CS_HREDRAW | CS_VREDRAW,
			WndProc,
			0,
			0,
			inst,
			LoadIcon(nullptr,IDI_APPLICATION),
			LoadCursor(nullptr,IDC_ARROW),
			(HBRUSH)GetStockObject(WHITE_BRUSH),
			nullptr,
			L"input_window_wndclass"
		};
		RECT size{ 0,0,200,240 };
	}

	/*
	* 目的：メインウィンドウのウィンドウプロシージャ
	* 例外：送出しません
	*/
	LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, WPARAM wp, LPARAM lp) {
		switch (msg) {
		case WM_CREATE:
			win_data::edit = CreateWindow(
				L"EDIT", L"",
				WS_CHILD | WS_VISIBLE | ES_LEFT,
				0, 20, 200, 20, hwnd,
				(HMENU)win_data::edit_num,
				win_data::inst, nullptr
			);
			win_data::button = CreateWindow(
				L"BUTTON", L"ENTER",
				WS_CHILD | WS_VISIBLE | BS_PUSHBUTTON,
				0, 40, 200, 200, hwnd,
				(HMENU)win_data::button_num,
				win_data::inst, nullptr
			);
			win_data::t_static = CreateWindow(
				L"STATIC", L"None",
				WS_CHILD | WS_VISIBLE,
				0, 0, 200, 20, hwnd,
				(HMENU)win_data::t_static_num,
				win_data::inst, nullptr
			);
			break;

		case WM_DESTROY:
			PostQuitMessage(0);
			break;

		case WM_COMMAND: {
			switch (LOWORD(wp)) {
			case win_data::button_num: {
				if (HIWORD(wp) == BN_CLICKED) {
					PostQuitMessage(0);
				}
				break;
			}
			}
			break;
		}
		}
		return DefWindowProcW(hwnd, msg, wp, lp);
	}

	/*
	* 目的：ウィンドウクラスを登録します
	* 例外：RegisterClass関数が失敗すると送出します
	*/
	void regist() {
		static bool is_ = false;
		if (!is_ && !RegisterClass(&win_data::main_wc)) {
			throw std::runtime_error("failed regist window class");
		}
		is_ = true;
	}

	/*
	* 目的：メインウィンドウを生成します
	* 条件：regist関数が正常に実行されたこと
	* 例外：送出しません
	*/
	void create() {
		static bool is_ = false;
		if (!is_) {
			AdjustWindowRect(&win_data::size, WS_OVERLAPPEDWINDOW, FALSE);
			is_ = true;
		}

		win_data::main = CreateWindowW(
			L"input_window_wndclass", L"input_window",
			WS_OVERLAPPEDWINDOW ^ WS_THICKFRAME
			^ WS_MAXIMIZEBOX | WS_VISIBLE,
			CW_USEDEFAULT, CW_USEDEFAULT,
			win_data::size.right - win_data::size.left,
			win_data::size.bottom - win_data::size.top,
			nullptr, nullptr, win_data::inst, nullptr
		);
	}
	/*
	* 目的：コントロールを有効化し、エディットコントロールにフォーカスを当てます
	* 引数：スタティックに設定する文字列を渡します
	* 条件：ウィンドウとコントロールが有効で、表示されていること
	* 例外：送出しません
	*/
	void enable_control(string& str_static) {
		SetWindowTextW(win_data::t_static, str_static.c_str());
		EnableWindow(win_data::edit, true);
		EnableWindow(win_data::button, true);
		SetFocus(win_data::edit);
	}

	/*
	* 目的：ウィンドウを有効化します
	* 関係：ウィンドウが生成されていないとregist関数とcreate関数を呼び出します
	* 例外：regist関数が送出することがあります
	*/
	void enable_window() {
		if (!IsWindowEnabled(win_data::main)) {
			regist();
			create();
		}
		ShowWindow(win_data::main, SW_RESTORE);
	}

	/*
	* 目的：コントロールを無効化します
	* 例外：送出しません
	*/
	void disable_control() {
		EnableWindow(win_data::edit, false);
		EnableWindow(win_data::button, false);
	}

	/*
	* 目的：メッセージループを隠蔽します
	* 例外：送出しません
	*/
	void messageloop() {
		MSG msg;
		bool is_enter = false;

		while (GetMessageW(&msg, nullptr, 0, 0) && !is_enter) {
			is_enter = (msg.message == WM_KEYDOWN && msg.wParam == VK_RETURN);
			TranslateMessage(&msg);
			DispatchMessageW(&msg);
		}
	}

	/*
	* 目的：エディットコントロールの文字列をint値に変換します
	* 返値：エディットコントロールの文字列から変換したint値
	* 備考：ハイフンが入力された文字列のいずれかに存在するとマイナス値と判定されます
	* 　　：オーバーフローした時の挙動は当然無定義です
	*/
	int convert() {
		unsigned result = 0;
		string str = get_edittext(win_data::edit);

		SetWindowTextW(win_data::edit, L"");

		bool is_minus = false;
		for (auto& ch : str) {
			if (ch == L'-') is_minus = true;
			if (L'0' <= ch && ch <= L'9') {
				result = result * 10 + (ch - L'0');
			}
		}

		return is_minus ? result * -1 : result;
	}

	/*
	* 目的：エディットコントロールからint値を取得します
	* 引数：コントロール・スタティックに設定する文字列を受け取ります
	* 返値：入力された文字列をint値に変換した値
	* 関係：enable_window関数、enable_control関数、messageloop関数、
	* 　　：disable_control関数、convert関数を呼び出します
	* 備考：入力が無かった場合は0が返ります
	*/
	int input(string static_str = L"None") {
		enable_window();
		enable_control(static_str);
		messageloop();
		disable_control();
		return convert();
	}
}