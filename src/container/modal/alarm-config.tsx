import * as React from 'react';
import { Modal, Form, Row, Input, Select } from 'component/antd';
import { modal } from 'store/modal';
import { alarm } from 'store/alarm';
import { observer } from 'mobx-react';

const Option = Select.Option;

const topicFormItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 11,
  },
};

@observer
class Alarm extends React.Component<any> {
  public handleSubmit = () => {
    debugger
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { disabled } = this.props;
    return (
      <Modal
        title="告警配置"
        style={{ top: 70 }}
        visible={true}
        onCancel={modal.close}
        maskClosable={false}
        width={700}
        destroyOnClose={true}
        okText="确定"
        cancelText="取消"
        onOk={this.handleSubmit}
      >
        <Form {...topicFormItemLayout} >
          <Row>
            <Form.Item
              label="告警配置名称"
            >
              {getFieldDecorator('alarmName', {
                rules: [{ required: true, message: '请输入告警配置名称' }],
                initialValue: alarm.curData.alarmName,
              })(
                <Input
                  placeholder="请输入告警配置名称"
                  disabled={disabled}
                />,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="组件类型"
            >
              {getFieldDecorator('comType', {
                rules: [{ required: true, message: '请选择组件类型' }],
              })(
                <Select>
                  <Option key="topic">Topic</Option>
                  <Option key="Broker">Broker</Option>
                  <Option key="Cluster">Cluster</Option>
                  <Option key="Group">Consumer Group Name</Option>
                </Select>,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="集群名称"
            >
              {getFieldDecorator('clusterName', {
                rules: [{ required: true, message: '请选择集群名称' }],
              })(
                <Select />,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="Metric"
            >
              {getFieldDecorator('metric', {
                rules: [{ required: true, message: '请选择 Metric' }],
                initialValue: alarm.curData.metricType,
              })(
                <Select>
                  <Option key="bytein">bytein</Option>
                  <Option key="byteout">byteout</Option>
                  <Option key="lag">lag</Option>
                </Select>,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="Condition"
            >
              {getFieldDecorator('condition', {
                rules: [{ required: true, message: '请选择 Condition' }],
                initialValue: alarm.curData.conditionType,
              })(
                <Select>
                  <Option key=">">{'>'}</Option>
                  <Option key="<">{'<'}</Option>
                  <Option key="=">=</Option>
                  <Option key=">=">{'>='}</Option>
                  <Option key="<=">{'<='}</Option>
                  <Option key="!=">{'!='}</Option>
                </Select>,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="value"
            >
              {getFieldDecorator('value', {
                rules: [{ required: true, message: '请输入 value' }],
              })(
                <Input />,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="连续次数"
            >
              {getFieldDecorator('try_times', {
                rules: [{ required: true, message: '请输入连续次数' }],
                initialValue: 1,
              })(
                <Input />,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="TAG"
            >
              {getFieldDecorator('tag', {
                rules: [{ required: true, message: '请输入tag' }],
                initialValue: '貌似这条当时讨论是后端生成！！！',
              })(
                <Input />,
              )}
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'topic' })(Alarm);
