/**
 * Test results jsx-file
 */

import React from 'react';

import io from 'socket.io-client';

import { Dialog, FlatButton, FloatingActionButton } from 'material-ui';
import Add from 'material-ui/svg-icons/content/add';
import * as Colors from 'material-ui/styles/colors';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';

import AddTest from './AddTest';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: Colors.purple700,
  }
});

const styles = {
  fab: {
    position: 'fixed',
    right: 50,
    bottom: 50
  }
};

const socket = io();

export default class TestResults extends React.Component {

  constructor(props, context) {
    super(props, context);

    // Setup initial state
    this.state = {
      // Results
      testResults: [],
      pipelines: [],
      addTestDialogOpened: false,
    };
  }

  componentDidMount() {
    // All pipelines
    socket.on('pipelines:updated', (pipelines) => {
      this.setState({
        pipelines: pipelines
      });
    });
  }

  closeAddTest() {
    this.setState({
      addTestDialogOpened: false
    });
    // Reset the test to add
    this.selectedPipeline = null;
  }

  openAddTest() {
    this.setState({
      addTestDialogOpened: true
    });
  }

  /**
   * Add test reports for a pipeline
   */
  addTest() {
    console.log('Adding pipeline for test report', this.selectedPipeline);
    this.closeAddTest();
  }

  /**
   * Select a pipeline to generate tests for
   */
  selectTestPipeline(pipelineTest) {
    this.selectedPipeline = pipelineTest;
  }

  render() {
    // In adminMode tests can be added
    const adminMode = window.location.search.indexOf('admin') >= 0;

    const addBtn = adminMode ? (
      <FloatingActionButton
        style={styles.fab}
        primary={true}
        onTouchTap={this.openAddTest.bind(this)}>
        <Add />
      </FloatingActionButton>
    ) : null;

    const addTestActions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.closeAddTest.bind(this)}
      />,
      <FlatButton
        label="Add"
        primary={true}
        onTouchTap={this.addTest.bind(this, this.selectedPipeline)}
      />
    ];

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="appcontainer">
          <h3>Hello world</h3>
          <Dialog
            title="Add Test"
            open={this.state.addTestDialogOpened}
            actions={addTestActions}
            onRequestClose={this.closeAddTest.bind(this)}>
            Select a pipeline to generate test reports for. For now only cucumber json is supported.
            <AddTest pipelines={this.state.pipelines} onPipelineSelect={this.selectTestPipeline.bind(this)} />
          </Dialog>
          {addBtn}
        </div>
      </MuiThemeProvider>
    );
  }
}
