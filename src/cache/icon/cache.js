import config from './config'
import BaseCache from '../base/cache'

const CACHE_KEY = 'icon_cache_key'
export default class IconCache extends BaseCache {
  constructor () {
    super()
    this.settingKey = CACHE_KEY
  }

  init () {
    super.init()
    this.doFlushSetting(
      CACHE_KEY, config
    )
  }

  addItem (options = {}) {
    const key = `icon-${options.extOpt.reqType ? options.extOpt.reqType + '-' : ''}add`
    this.sendRequest(
      key, options
    )
  }

  collectIcon (options = {}) {
    const key = 'icon-draft-collect'
    this.sendRequest(
      key, options
    )
  }

  delete (options = {}) {
    const key = `icon-${options.extOpt.reqType ? options.extOpt.reqType + '-' : ''}delete`
    this.sendRequest(
      key, options
    )
  }

  update (options = {}) {
    const key = `icon-${options.extOpt.reqType ? options.extOpt.reqType + '-' : ''}update`
    this.sendRequest(
      key, options
    )
  }

  download (options = {}) {
    const key = `icon-${options.extOpt.reqType ? options.extOpt.reqType + '-' : ''}download`
    this.sendRequest(
      key, options
    )
  }

  getList (options = {}) {
    const key = `icon-${options.extOpt.reqType ? options.extOpt.reqType + '-' : ''}list`
    this.sendRequest(
      key, options
    )
  }

  submitIconDraft2Icon (options = {}) {
    this.sendRequest(
      'icon-draft-to-icon', options
    )
  }
}
