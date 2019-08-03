import * as React from 'react';
import { Modal, Form, Row, Input, Select, DatePicker, Col, Button, Radio } from 'component/antd';
import { modal } from 'store/modal';

const Option = Select.Option;

const topicFormItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
};

class Cluster extends React.Component<any> {
  public handleSubmit = () => {
    debugger
  }

  public getTitle() {
    return '添加集群';
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={this.getTitle()}
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
              label="集群名称"
            >
              {getFieldDecorator('clusterName', {
                rules: [{ required: true, message: '请输入集群名称' }],
                // initialValue: 
              })(
                <Input
                  placeholder="请输入集群名称"
                />,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="zookeeper地址"
            >
              {getFieldDecorator('zookeeper', {
                rules: [{ required: true, message: '请输入 zookeeper 地址' }],
                // initialValue: 
              })(
                <Input
                  placeholder="请输入 zookeeper 地址"
                />,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="kafka版本"
            >
              {getFieldDecorator('kafkaVersion', {
                rules: [{ required: true, message: '请选择 kafka 版本' }],
                // initialValue: alarm.curData.metricType,
              })(
                <Select>
                  <Option key="bytein">0.10.12</Option>
                  <Option key="byteout">0.10.13</Option>
                  <Option key="lag">0.10.14</Option>
                </Select>,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="集群访问地址"
            >
              {getFieldDecorator('clusterAddress', {
                rules: [{ required: true, message: '请输入集群访问地址' }],
              })(
                <Input />,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="是否开启告警"
            >
              {getFieldDecorator('try_times', {
                rules: [{ required: true, message: '请选择是否开启告警' }],
                initialValue: 1,
              })(
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={2}>否</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'topic' })(Cluster);
