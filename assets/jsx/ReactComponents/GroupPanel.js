var _ = require('lodash')
var React = require('react')
var SVGCollection = require('./SVGCollection')
var ListSVG = require('./ListSVG')
var color = require('../../js/color')

var GroupPanel = React.createClass({

    propTypes: {
        data: React.PropTypes.object.isRequired,
        activeGroup: React.PropTypes.object,
        coloring: React.PropTypes.string,
        isGeneListShown: React.PropTypes.bool,
        onGroupClick: React.PropTypes.func,
        onGroupListClick: React.PropTypes.func,
        onAnalyse: React.PropTypes.func
    },

    componentDidMount: function() {
    },
    
    render: function() {

        // console.log('group panel render')

        var that = this
        var elems = []
        var options = this.props.data.elements.groups
        for (var i = 0, ii = options.length; i < ii; i++) {
            // group = that.props.data.elements.clusters[i]
            group = options[i]
            var isActiveGroup = (group === that.props.activeGroup)
            var className = 'group clickable'
            var clr, title, listVisibility
            if (isActiveGroup) {
                clr = color.colors.textdefault
                title = ''
                listVisibility = 'visible'
            } else {
                clr = color.colors.gngray
                title = 'Select ' + group.name
                listVisibility = 'hidden'
            }
            
            elems.push(<tr key={group.name.toUpperCase()}>
                       <td title={title} className={className} style={{color: clr}} onClick={that.props.onGroupClick.bind(null, group)}>
                       {group.name.toUpperCase()}
                       </td>
                       <td className='verysmalldescription clickable' style={{textAlign: 'right', color: clr}}  onClick={that.props.onGroupClick.bind(null, group)}>
                       {group.nodes.length}
                       </td>
                       {group.nodes.length > 1 ?
                        (<td className='clickable' style={{textAlign: 'right', visibility: listVisibility}} onClick={that.props.onGroupListClick.bind(null, group)}>
                         <ListSVG w={10} h={10} n={group.nodes.length} color={that.props.isGeneListShown ? color.colors.textdefault : color.colors.gngray} />
                         </td>) :
                        (<td></td>)}
                        </tr>)
        }

        var geneStr = this.props.activeGroup.nodes.join(',')
        // Analyse {that.props.activeGroup.nodes.length} {that.props.activeGroup.nodes.length === 1 ? 'gene' : 'genes'}
        // {that.props.activeGroup.nodes.length === 1 ? <span style={{visibility: 'hidden'}}>s</span> : ''}
        return (
                <div id='grouppanel' className='networkleftpanel bordered smallpadding paddingbottom noshrink' style={this.props.style || {}}>
                <table style={{width: '100%'}}>
                <tbody>
                {elems}
            </tbody>
                </table>
                <br/>
                {that.props.activeGroup.nodes.length > 4 ?
                 (<div title='Run pathway analysis and gene prediction' className='button clickable' onClick={that.props.onAnalyse.bind(null, that.props.activeGroup)}>
                  ANALYSE {that.props.activeGroup.name.toUpperCase()}
                  </div>) :
                 (<div title='At least five genes are needed for analysis' className='button disabled'>
                  ANALYSE {that.props.activeGroup.name.toUpperCase()}
                  </div>)}
                </div>
        )
    }
})

module.exports = GroupPanel

//                 <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'flex-start'}}>
