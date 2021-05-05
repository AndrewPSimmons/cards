webpackHotUpdate("main",{

/***/ "./src/components/pages/Gameroom.js":
/*!******************************************!*\
  !*** ./src/components/pages/Gameroom.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-client */ \"./node_modules/socket.io-client/build/index.js\");\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Gameroom_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Gameroom.css */ \"./src/components/pages/Gameroom.css\");\n/* harmony import */ var _Gameroom_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Gameroom_css__WEBPACK_IMPORTED_MODULE_3__);\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n__webpack_require__(/*! dotenv */ \"./node_modules/dotenv/lib/main.js\").config({\n  path: \"~/Desktop/Dev/'fun_projects'/cards\"\n});\n\nconsole.log(process.cwd());\nconsole.log(process.env);\n\nvar invalid_user = function invalid_user(set_in_room, set_data) {\n  set_data({\n    \"data\": null\n  });\n  set_in_room(\"false\");\n};\n\nvar Chat = function Chat(_ref) {\n  var message_data = _ref.message_data;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", null, JSON.stringify(message_data)));\n};\n\nvar RoomMember = function RoomMember(_ref2) {\n  var member = _ref2.member;\n  var username = member.username,\n      id = member.id;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", null, username));\n};\n\nvar Gameroom = function Gameroom(_ref3) {\n  var set_in_room = _ref3.set_in_room,\n      set_data = _ref3.set_data,\n      data = _ref3.data;\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])([]),\n      _useState2 = _slicedToArray(_useState, 2),\n      messages = _useState2[0],\n      set_messages = _useState2[1];\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])(\"\"),\n      _useState4 = _slicedToArray(_useState3, 2),\n      message_input = _useState4[0],\n      set_message_input = _useState4[1];\n\n  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])([]),\n      _useState6 = _slicedToArray(_useState5, 2),\n      members = _useState6[0],\n      set_members = _useState6[1];\n\n  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])(),\n      _useState8 = _slicedToArray(_useState7, 2),\n      socket = _useState8[0],\n      set_socket = _useState8[1];\n\n  var leave_room = function leave_room() {\n    socket.emit(\"room_leave\", data);\n    set_messages([]);\n    set_data({\n      \"data\": null\n    });\n    set_in_room(false);\n  };\n\n  var close_room = function close_room() {\n    socket.emit(\"room_close\", data);\n    set_data({\n      \"dataaa\": null\n    });\n    set_in_room(false);\n    set_messages([]); //Emit that the room is no longer valid\n  };\n\n  var send_message = function send_message() {\n    socket.emit(\"new_message\", message_input);\n    console.log(\"1. mesasges in send_message()\", messages);\n  };\n\n  var new_message = function new_message(message) {\n    console.log(\"2. current messages: \", messages);\n    console.log(\"3. new incoming message\", message);\n    set_messages(function (messages) {\n      return [].concat(_toConsumableArray(messages), [message]);\n    });\n  };\n\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(function () {\n    axios__WEBPACK_IMPORTED_MODULE_0___default()(\"http://localhost:3001/validate_user_in_room\", {\n      method: \"GET\",\n      mode: \"no-cors\",\n      params: {\n        data: JSON.stringify(data)\n      }\n    }).then(function (response) {\n      if (!response.data.valid_user) {\n        invalid_user(set_in_room, set_data);\n      } else {\n        //TIME TO SETUP SOCKET.IO when this comonent renders we want to see if the roomid exists and if it does not then set_in_room should be false\n        var s = Object(socket_io_client__WEBPACK_IMPORTED_MODULE_2__[\"io\"])(\"http://localhost:3002\", {\n          query: data\n        });\n        s.on(\"disconnect\", function (data) {\n          set_data({\n            \"data\": null\n          });\n        });\n        s.on(\"gameroom_data\", function (data) {\n          set_members(data.members_data);\n        });\n        s.on(\"room_close\", function () {\n          set_data({\n            \"data\": null\n          });\n          set_in_room(\"false\");\n        });\n        s.on(\"abort_room\", function () {\n          set_data({\n            \"data\": null\n          });\n          set_in_room(\"false\");\n        });\n        s.on(\"new_message\", function (message) {\n          new_message(message);\n        });\n        set_socket(s);\n        console.log(\"socket is set to: \", s);\n      }\n    });\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, data.host ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"button\", {\n    onClick: function onClick() {\n      return close_room();\n    }\n  }, \"Close Room\") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"button\", {\n    onClick: function onClick() {\n      return leave_room();\n    }\n  }, \"Leave Room\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n    className: \"gameroom-container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n    className: \"gameroom-chat\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n    className: \"gameroom-chat-list\"\n  }, messages.map(function (message, index) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      key: index\n    }, message.username, \" - \", message.message);\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n    className: \"gameroom-chat-control\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"input\", {\n    type: \"text\",\n    onChange: function onChange(e) {\n      return set_message_input(e.target.value);\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"button\", {\n    onClick: function onClick() {\n      return send_message();\n    }\n  }, \"Send\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n    className: \"gameroom-members\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"h2\", null, \"Members\"), members.map(function (member, index) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(RoomMember, {\n      key: index,\n      member: member\n    });\n  }))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Gameroom);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./src/components/pages/Gameroom.js?");

/***/ })

})