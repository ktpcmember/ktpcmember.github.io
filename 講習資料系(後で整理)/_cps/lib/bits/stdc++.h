#pragma once

/**
* @file stdc++.h
* @brief 標準ライブラリを全てインクルードします
* @author tomolatoon
* @date 2021/02/01
*/

#ifndef TOMOLATOON_ALL_STD_INCLUDE
#define TOMOLATOON_ALL_STD_INCLUDE

#define CPP98 199711L
#define CPP11 201103L
#define CPP14 201402L
#define CPP17 201703L
#define CPP20 202002L

#if CPP20 < __cplusplus // C++23

#endif // C++23

#if CPP17 < __cplusplus // C++20
#if __has_include(<concepts>)
#include <concepts>
#endif
#if __has_include(<coroutine>)
#include <coroutine>
#endif
#if __has_include(<compare>)
#include <compare>
#endif
#if __has_include(<version>)
#include <version>
#endif
#if __has_include(<source_location>)
#include <source_location>
#endif
#if __has_include(<format>)
#include <format>
#endif
#if __has_include(<span>)
#include <span>
#endif
#if __has_include(<ranges>)
#include <ranges>
#endif
#if __has_include(<bit>)
#include <bit>
#endif
#if __has_include(<numbers>)
#include <numbers>
#endif
#if __has_include(<syncstream>)
#include <syncstream>
#endif
#if __has_include(<stop_token>)
#include <stop_token>
#endif
#if __has_include(<semaphore>)
#include <semaphore>
#endif
#if __has_include(<latch>)
#include <latch>
#endif
#if __has_include(<barrier>)
#include <barrier>
#endif
#endif // C++20

#if CPP14 < __cplusplus // C++17
#if __has_include(<any>)
#include <any>
#endif
#if __has_include(<optional>)
#include <optional>
#endif
#if __has_include(<variant>)
#include <variant>
#endif
#if __has_include(<memory_resource>)
#include <memory_resource>
#endif
#if __has_include(<string_view>)
#include <string_view>
#endif
#if __has_include(<charconv>)
#include <charconv>
#endif
#if __has_include(<execution>)
#include <execution>
#endif
#if __has_include(<filesystem>)
#include <filesystem>
#endif
#endif // C++17

#if CPP11 < __cplusplus // C++14
#include <shared_mutex>
#endif // C++14

#if CPP98 < __cplusplus // C++11
#include <typeindex>
#include <type_traits>
#include <chrono>
#include <initializer_list>
#include <tuple>
#include <scoped_allocator>
#include <cstdint>
#include <cinttypes>
#include <system_error>
#include <cuchar>
#include <array>
#include <forward_list>
#include <unordered_map>
#include <unordered_set>
#include <random>
#include <ratio>
#include <cfenv>
#include <codecvt>
#include <regex>
#include <atomic>
#include <thread>
#include <mutex>
#include <future>
#include <condition_variable>
#endif // C++11

#if __cplusplus // C++98/03
#include <cstdlib>
#include <csignal>
#include <csetjmp>
#include <typeinfo>
#include <bitset>
#include <functional>
#include <utility>
#include <ctime>
#include <cstddef>
#include <new>
#include <memory>
#include <climits>
#include <cfloat>
#include <limits>
#include <exception>
#include <stdexcept>
#include <cassert>
#include <cerrno>
#include <cctype>
#include <cwctype>
#include <cwctype>
#include <cstring>
#include <cwchar>
#include <string>
#include <vector>
#include <deque>
#include <list>
#include <set>
#include <map>
#include <stack>
#include <queue>
#include <iterator>
#include <algorithm>
#include <cmath>
#include <complex>
#include <valarray>
#include <numeric>
#include <locale>
#include <clocale>
#include <iosfwd>
#include <ios>
#include <istream>
#include <ostream>
#include <iostream>
#include <fstream>
#include <sstream>
#include <iomanip>
#include <streambuf>
#include <cstdio>

#endif // C++98/03

// C
#include <cassert>
#include <cctype>
#include <cerrno>
#include <cfloat> 
#include <ciso646>
#include <climits>
#include <clocale>
#include <cmath>
#include <csetjmp>
#include <csignal>
#include <cstdarg>
#include <cstddef>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <ctime>
#include <cwchar>
#include <cwctype>

#if CPP98 < __cplusplus // C++11(C)
#include <cfenv>
#include <cinttypes>
#include <cstdint>
#include <cuchar>

#if CPP17 > __cplusplus
#include <ccomplex>
#include <cstdalign>
#include <cstdbool>
#include <ctgmath>
#endif
#endif // C++11(C)

#endif // ifndef TOMOLATOON_ALL_STD_INCLUDE
