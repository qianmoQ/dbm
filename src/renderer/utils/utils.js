import { isNotEmpty } from '@/utils/StringUtils'
import Authentication from '@/store/modules/Authentication'

/**
 * Format string
 * <p>stringFormat('format {0}', ['test']) return 'format test'</p>
 * @param {*} formatted format style
 * @param {*} args format parmater
 * @returns formatted string
 */
export function stringFormat(formatted, args) {
  for (let i = 0; i < args.length; i++) {
    const regexp = new RegExp('\\{' + i + '\\}', 'gi')
    formatted = formatted.replace(regexp, args[i])
  }
  return formatted
}

export function getDataSource(name) {
  const dataSource = JSON.parse(localStorage.getItem('DataSources'))
    .filter(item => item.name === name)
  return dataSource
}

export function getServerURL(host, port, url) {
  let serverUrl = null
  if (port !== null && url !== null) {
    serverUrl = stringFormat('http://{0}:{1}/{2}', [host, port, url])
  } else if (port !== null) {
    serverUrl = stringFormat('http://{0}:{1}', [host, port])
  } else {
    serverUrl = stringFormat('http://{0}', [host])
  }
  return serverUrl
}

export function getFaIcon(source) {
  let icon = 'fa fa-adjust'
  switch (source) {
    case 'MergeTree':
    case 'SystemMergeTreeSettings':
    case 'SystemMerges':
      icon = 'fa fa-tree'
      break
    case 'MaterializedView':
      icon = 'fa fa-eye'
      break
    case 'SystemAggregateFunctionCombinators':
    case 'SystemBuildOptions':
      icon = 'fa fa-cog'
      break
    case 'SystemAsynchronousMetrics':
    case 'SystemGraphite':
    case 'SystemMetrics':
      icon = 'fa fa-line-chart'
      break
    case 'SystemClusters':
      icon = 'fa fa-cubes'
      break
    case 'SystemCurrentRoles':
    case 'SystemEnabledRoles':
      icon = 'fa fa-flag'
      break
    case 'Server':
      icon = 'fa fa-server'
      break
    case 'DataBase':
      icon = 'fa fa-database'
      break
    case 'Table':
      icon = 'fa fa-table'
      break
  }
  return icon
}

export function getValue(source, defaultValue) {
  if (source) {
    return source
  }
  return defaultValue
}

export function getLength(source) {
  if (source !== undefined && source !== null) {
    return source.length
  }
  return 0
}

export function getLengthGtZore(source) {
  return getLength(source) > 0
}

export function getLengthLtZore(source) {
  return getLength(source) < 0
}

export function getLengthEqZore(source) {
  return getLength(source) === 0
}

export function formatAuthentication(host, port, username, password, server) {
  const authentication = new Authentication()
  if (isNotEmpty(host)) {
    authentication.host = host
  }
  if (isNotEmpty(port)) {
    authentication.port = port
  }
  if (isNotEmpty(username)) {
    authentication.username = username
  }
  if (isNotEmpty(password)) {
    authentication.password = password
  }
  if (isNotEmpty(server)) {
    authentication.server = server
  }
  return authentication
}

export function formatRemoteUrl(configuration) {
  let remoteUrl = null
  const hasAuthentication = (isNotEmpty(configuration.username) && isNotEmpty(configuration.password))
  const protocol = getValue(configuration.protocol, 'http')
  if (hasAuthentication) {
    remoteUrl = stringFormat('{0}://{1}:{2}/?user={3}&password={4}', [protocol, configuration.host, configuration.port, configuration.username, configuration.password])
  } else {
    remoteUrl = stringFormat('{0}://{1}:{2}', [protocol, configuration.host, configuration.port])
  }
  return remoteUrl
}

export function getTrackColor(type) {
  let color
  switch (type) {
    case 'QueryFinish':
      color = '#67C23A'
      break
    case 'ExceptionBeforeStart':
    case 'ExceptionWhileProcessing':
      color = '#F56C6C'
      break
    default:
      color = '#409EFF'
      break
  }
  return color
}
