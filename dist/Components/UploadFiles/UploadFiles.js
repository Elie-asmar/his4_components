"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.url.js");

require("core-js/modules/web.url-search-params.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.array.sort.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.test.js");

var _react = _interopRequireDefault(require("react"));

var _lodash = require("lodash");

var _FilesList = _interopRequireDefault(require("./components/FilesList"));

var _pdf = _interopRequireDefault(require("./assets/pdf.png"));

var _docx = _interopRequireDefault(require("./assets/docx.png"));

var _excel = _interopRequireDefault(require("./assets/excel.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const supportedExtensions = ["jpg", "jpeg", "PNG", "png", "gif", "bmp", "docx", "xlsx", "xls", "mp4", "webm", "mp3", "pdf", "msg"];

class UploadFiles extends _react.default.Component {
  constructor(props) {
    super(props); // let files = [ //schema of data get from back-end
    //   {
    //     file: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    //     name: "Empire_State_Building.jpg",
    //     deleted: false
    //   },
    //   {
    //     file: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    //     name: "Empire_State_Building1.jpg",
    //     deleted: false
    //   }
    // ];
    //N.B: get the name from the url -> url.substring(file.url.lastIndexOf('/') + 1)
    // const data = props.data ? props.data : [...files];

    _defineProperty(this, "populateData", data => {
      let oldFiles = [],
          newFiles = [];

      if (data && data.length > 0) {
        (0, _lodash.map)(data, item => {
          if (item.file instanceof File) {
            newFiles.push(item.file);
          } else {
            oldFiles.push(item);
          }
        });
      }

      return [oldFiles, newFiles];
    });

    _defineProperty(this, "handleBrowseClick", e => {
      document.getElementById(this.props.name).click();
    });

    _defineProperty(this, "updateData", item => {
      if (item instanceof File) {
        return {
          file: item,
          name: item.name,
          deleted: false,
          readOnly: item.readOnly ? true : false
        };
      }

      return {
        file: item.url,
        name: item.name,
        deleted: item.deleted,
        readOnly: item.readOnly ? true : false,
        id: item.id
      };
    });

    _defineProperty(this, "handleSelectedFiles", event => {
      let data = [],
          files = [];

      if (this.props.maxSize && event.target.files[0].size > this.props.maxSize * 1024 * 1000) {
        this.setState({
          limitmsg: true
        }, () => {
          this.props.onUploadUpdateData(this.renameDuplicate(this.state.data), this.props.name);
        });
      } else {
        this.setState({
          limitmsg: false
        });
        const selFiles = [...event.target.files];
        event.target.value = null; //Check if multiple props is enabled if not clear the newFiles and Update the old as deleted 

        if (!this.props.multiple) {
          //If the props multiple is not set handle the select to replace file when selected
          let oldDelted = [...this.state.oldfiles].map(item => {
            return _objectSpread(_objectSpread({}, item), {}, {
              deleted: true
            });
          });
          this.setState({
            newfiles: [],
            oldfiles: oldDelted
          }, () => {
            this.setState(prev => {
              //exclude the file already selected
              const myFiles = selFiles.filter(o1 => prev.newfiles.map(o2 => o2.name).indexOf(o1.name) === -1);
              files = [...prev.newfiles, ...myFiles];
              data = [...this.state.oldfiles, ...files].map(item => {
                return this.updateData(item);
              });
              return {
                data,
                newfiles: files
              };
            }, () => {
              this.props.onUploadUpdateData(this.renameDuplicate(data), this.props.name);
            });
          });
        } else {
          this.setState(prev => {
            //exclude the file already selected
            const myFiles = selFiles; //.filter(o1 => prev.newfiles.map(o2 => o2.name).indexOf(o1.name) === -1);

            files = [...prev.newfiles, ...myFiles];
            data = [...this.state.oldfiles, ...files].map(item => {
              return this.updateData(item);
            });
            return {
              data,
              newfiles: files
            };
          }, () => {
            this.props.onUploadUpdateData(this.renameDuplicate(data), this.props.name);
          });
        }
      }
    });

    _defineProperty(this, "handleDeleteItem", (name, source) => e => {
      this.setState({
        oldFiles: this.renameDuplicate(this.state.oldfiles),
        newFiles: this.renameDuplicate(this.state.newfiles),
        data: this.renameDuplicate(this.state.data)
      }, () => {
        let data = [],
            files = [];

        if (source === "old") {
          files = [...this.state.oldfiles];
          const file = files.find(o => {
            return o.name === name;
          });

          if (file) {
            file.deleted = true;
            data = [...files, ...this.state.newfiles].map(item => {
              return this.updateData(item);
            });
            this.setState({
              data,
              oldfiles: files
            }, () => {
              this.props.onUploadUpdateData(this.renameDuplicate(data), this.props.name);
            });
          }
        } else {
          files = [...this.state.newfiles];
          const i = files.findIndex(o => {
            return o.name === name;
          });

          if (i >= 0) {
            files.splice(i, 1);
            data = [...this.state.oldfiles, ...files].map(item => {
              return this.updateData(item);
            });
            this.setState({
              data,
              newfiles: files
            }, () => {
              this.props.onUploadUpdateData(this.renameDuplicate(data), this.props.name);
            });
          }
        }
      });
    });

    _defineProperty(this, "prepareFiles", files => {
      return files.map(item => {
        let url = "";
        let source = "";
        let id = "";

        if (item instanceof File) {
          url = URL.createObjectURL(item);
          source = "new";
        } else {
          url = item.file;
          id = item.id;
          source = "old";
        }

        const name = item.name;
        let readOnly = item.readOnly;
        const ext = name.substr(name.lastIndexOf('.') + 1, name.length);
        console.log({
          ext
        });
        let fileType = ext;
        let thumbnail = null;

        switch (ext) {
          case "doc":
          case "docx":
            thumbnail = _docx.default;
            break;

          case "xlsx":
          case "xls":
            thumbnail = _excel.default;
            break;

          case "pdf":
            thumbnail = _pdf.default; // url = `${url}#toolbar=0`;

            break;

          default:
            thumbnail = url;
        }

        if (!supportedExtensions.includes(fileType)) {
          this.extSupp = false;
          this.ext = fileType;

          if (this.props.isExtensionError) {
            this.props.isExtensionError(false);
          }

          return {
            name: name,
            url: url,
            id: id ? id : 0,
            thumbnail: thumbnail,
            fileType: fileType,
            deleted: true,
            source: source,
            readOnly: readOnly
          };
        }

        ;

        if (this.props.isExtensionError) {
          this.props.isExtensionError(true);
        }

        ;
        this.extSupp = true;
        this.ext = "";
        return {
          name: name,
          url: url,
          id: id ? id : 0,
          thumbnail: thumbnail,
          fileType: fileType,
          deleted: !!item.deleted,
          source: source,
          readOnly: readOnly
        };
      });
    });

    _defineProperty(this, "getLimit", () => {
      return this.state.limitmsg;
    });

    const [_oldFiles, _newFiles] = props.multiple ? this.populateData(props.data) : props.data.length > 0 ? this.populateData([props.data[0]]) : this.populateData([]); //Take the First file if multiple is false and if multiple files are sent 

    this.state = {
      data: props.multiple ? props.data : props.data && props.data.length > 0 ? [props.data[0]] : [],
      oldfiles: this.prepareFiles(_oldFiles),
      newfiles: _newFiles,
      extSupp: true,
      ext: ""
    }; //Update the files in the parent compoment when multiple is false and if multiple files are sent 

    if (!props.multiple) this.props.onUploadUpdateData(this.state.data, props.name);
  }

  renameDuplicate(array) {
    let duplicate = {};
    let temps = (0, _lodash.cloneDeep)(array);
    temps = temps.sort(function (a, b) {
      let returnVal;
      let nameA = a.name.toUpperCase();
      let nameB = b.name.toUpperCase(); //Sort the base 64 File based on the name for the indexing of Copy

      if (!(a.file instanceof File) && !(b.file instanceof File) && nameA < nameB) returnVal = -1;else if (!(a.file instanceof File) && !(b.file instanceof File) && nameA > nameB) returnVal = 1;
      return returnVal;
    });
    (0, _lodash.map)(temps, (value, key) => {
      if (!value.deleted) {
        if (array.some(temp => temp.name === value.name || temp.name === value.name.substr(0, value.name.lastIndexOf('Copy')) + value.name.substr(value.name.lastIndexOf('.'), value.name.length))) {
          if (duplicate[value.name] > 0 || duplicate[value.name.substr(0, value.name.lastIndexOf('Copy')) + value.name.substr(value.name.lastIndexOf('.'), value.name.length)]) {
            let ext = value.name.substr(value.name.lastIndexOf('.'), value.name.length);
            let nameheader = value.name.substr(0, value.name.lastIndexOf('Copy'));
            let name = /Copy\(\d+\)./.test(value.name) ? nameheader + ext : value.name;
            duplicate[name] = duplicate[name] ? duplicate[name] + 1 : 1;

            if (value.file instanceof File) {
              value.name = name;
              let ext = value.name.substr(value.name.lastIndexOf('.'), value.name.length);
              value.name = value.name.substr(0, value.name.lastIndexOf('.')) + "Copy(" + (duplicate[value.name] - 1) + ")" + ext;
              value.file = new File([value.file], value.name, {
                type: value.file.type
              });
            }
          } else {
            duplicate[value.name] = duplicate[value.name] ? duplicate[value.name] + 1 : 1;
          }
        }
      }
    });
    return temps;
  }

  componentWillReceiveProps(nextProps) {
    if (!(0, _lodash.isEqual)(this.state.data, nextProps.data)) {
      const [oldFiles, newFiles] = this.populateData(nextProps.data);
      this.setState({
        data: nextProps.data,
        oldfiles: this.prepareFiles(oldFiles),
        newfiles: newFiles
      });
    }
  }

  render() {
    const {
      accept,
      multiple,
      classRow,
      readOnly
    } = this.props;
    const {
      oldfiles,
      newfiles
    } = this.state;
    const items = [...oldfiles, ...this.prepareFiles(newfiles)].filter(o => {
      return !o.deleted;
    });
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !readOnly && /*#__PURE__*/_react.default.createElement("input", {
      type: "file",
      id: this.props.name,
      accept: accept,
      multiple: multiple,
      style: {
        display: "none"
      },
      onChange: this.handleSelectedFiles
    }), !readOnly && /*#__PURE__*/_react.default.createElement("input", {
      type: "button",
      value: "Choose File",
      style: {
        marginBottom: "10px",
        cursor: "pointer"
      },
      onClick: this.handleBrowseClick
    }), this.state.limitmsg && /*#__PURE__*/_react.default.createElement("label", {
      className: "errorLabel offset-1"
    }, "  File Size Greater than ", this.props.maxSize, " mb"), typeof this.extSupp == "boolean" && this.extSupp == false && /*#__PURE__*/_react.default.createElement("label", {
      className: "errorLabel offset-1"
    }, this.ext, " File Extension is not supported "), /*#__PURE__*/_react.default.createElement(_FilesList.default, {
      items: items,
      isEmail: this.props.isEmail,
      classRow: classRow,
      onDeleteClick: this.handleDeleteItem,
      readOnly: readOnly,
      className: this.props.className
    }));
  }

}

var _default = UploadFiles;
exports.default = _default;