#pragma once

#include <Windows.h>
#include <string>

#include <stdexcept>

/*
* �ړI�Fint�l���G�f�B�b�g�R���g���[���ɂ���ē��͏o����input�֐����`���܂�
* �d�l�Finput�֐��̕Ԃ�l�����͂��ꂽ�l
* �@�@�F�n�C�t����t����ƃ}�C�i�X�l�ɂȂ�
* �g�p�F�G�f�B�b�g�R���g���[���ɓ��͌�AEnter�L�[�����̃{�^�����N���b�N���܂�
*/
namespace winput {
	using string = std::wstring;

	/*
	* �ړI�F�����ɓn�����G�f�B�b�g�R���g���[���̕�������擾���ĕԋp���܂�
	* �����F�����͗L���ȃG�f�B�b�g�R���g���[���ł��邱��
	* ��O�F�����H�Ƀ������A���P�[�g�ő��o�����\��������܂�
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
	* inst		�F�C���X�^���X�n���h��
	* main		�F���C���E�B���h�E�̃n���h��
	* edit		�F�R���g���[���E�G�f�B�b�g�̃n���h��
	* button	�F�R���g���[���E�{�^���̃n���h��
	* t_static	�F�R���g���[���E�X�^�e�B�b�N�̃n���h��
	* main_wc	�F���C���E�B���h�E�̃E�B���h�E�N���X
	* size		�F���C���E�B���h�E�̃N���C�A���g�̈�T�C�Y
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
	* �ړI�F���C���E�B���h�E�̃E�B���h�E�v���V�[�W��
	* ��O�F���o���܂���
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
	* �ړI�F�E�B���h�E�N���X��o�^���܂�
	* ��O�FRegisterClass�֐������s����Ƒ��o���܂�
	*/
	void regist() {
		static bool is_ = false;
		if (!is_ && !RegisterClass(&win_data::main_wc)) {
			throw std::runtime_error("failed regist window class");
		}
		is_ = true;
	}

	/*
	* �ړI�F���C���E�B���h�E�𐶐����܂�
	* �����Fregist�֐�������Ɏ��s���ꂽ����
	* ��O�F���o���܂���
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
	* �ړI�F�R���g���[����L�������A�G�f�B�b�g�R���g���[���Ƀt�H�[�J�X�𓖂Ă܂�
	* �����F�X�^�e�B�b�N�ɐݒ肷�镶�����n���܂�
	* �����F�E�B���h�E�ƃR���g���[�����L���ŁA�\������Ă��邱��
	* ��O�F���o���܂���
	*/
	void enable_control(string& str_static) {
		SetWindowTextW(win_data::t_static, str_static.c_str());
		EnableWindow(win_data::edit, true);
		EnableWindow(win_data::button, true);
		SetFocus(win_data::edit);
	}

	/*
	* �ړI�F�E�B���h�E��L�������܂�
	* �֌W�F�E�B���h�E����������Ă��Ȃ���regist�֐���create�֐����Ăяo���܂�
	* ��O�Fregist�֐������o���邱�Ƃ�����܂�
	*/
	void enable_window() {
		if (!IsWindowEnabled(win_data::main)) {
			regist();
			create();
		}
		ShowWindow(win_data::main, SW_RESTORE);
	}

	/*
	* �ړI�F�R���g���[���𖳌������܂�
	* ��O�F���o���܂���
	*/
	void disable_control() {
		EnableWindow(win_data::edit, false);
		EnableWindow(win_data::button, false);
	}

	/*
	* �ړI�F���b�Z�[�W���[�v���B�����܂�
	* ��O�F���o���܂���
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
	* �ړI�F�G�f�B�b�g�R���g���[���̕������int�l�ɕϊ����܂�
	* �Ԓl�F�G�f�B�b�g�R���g���[���̕����񂩂�ϊ�����int�l
	* ���l�F�n�C�t�������͂��ꂽ������̂����ꂩ�ɑ��݂���ƃ}�C�i�X�l�Ɣ��肳��܂�
	* �@�@�F�I�[�o�[�t���[�������̋����͓��R����`�ł�
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
	* �ړI�F�G�f�B�b�g�R���g���[������int�l���擾���܂�
	* �����F�R���g���[���E�X�^�e�B�b�N�ɐݒ肷�镶������󂯎��܂�
	* �Ԓl�F���͂��ꂽ�������int�l�ɕϊ������l
	* �֌W�Fenable_window�֐��Aenable_control�֐��Amessageloop�֐��A
	* �@�@�Fdisable_control�֐��Aconvert�֐����Ăяo���܂�
	* ���l�F���͂����������ꍇ��0���Ԃ�܂�
	*/
	int input(string static_str = L"None") {
		enable_window();
		enable_control(static_str);
		messageloop();
		disable_control();
		return convert();
	}
}