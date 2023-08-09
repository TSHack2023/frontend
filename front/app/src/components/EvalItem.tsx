import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";

interface Item {
    evalid: number,
    evalname: string,
    evalmax: number,
    evalmin: number,
    explanation: string,
}

const EvalItem: React.FC = () => {
    const [evalname, setEvalName] = useState("");
    const [evalmax, setEvalmax] = useState<number>(0);
    const [evalmin, setEvalmin] = useState<number>(0);
    const [explanation, setExplanation] = useState("");

    return (
        <>
        <Form>
            {/* 評価値設定 */}
            <Form.Group as={Row} className="mt-5" controlId="evaluation">
            {/* 評価項目 */}
            <Form.Label column sm="1">
                評価項目
            </Form.Label>
            <Col sm="2">
                <Form.Control
                type="text"
                value={evalname}
                onChange={(e) => {
                    setEvalName(e.target.value);
                }}
                />
            </Col>

            {/* 評価値最大値 */}
            <Form.Label column sm="2">
                評価値最大値
            </Form.Label>
            <Col sm="2">
                <Form.Control
                type="number"
                value={evalmax}
                onChange={(e) => {
                    setEvalmax(Number(e.target.value));
                }}
                />
            </Col>

            {/* 評価値最小値 */}
            <Form.Label column sm="2">
                評価値最小値
            </Form.Label>
            <Col sm="2">
                <Form.Control
                type="number"
                value={evalmin}
                onChange={(e) => {
                    setEvalmin(Number(e.target.value));
                }}
                />
            </Col>
            </Form.Group>

            {/* 説明 */}
            <Form.Group as={Row} className="mt-2" controlId="explanation">
            <Form.Label column sm="1">
                説明
            </Form.Label>
            <Col sm="10">
                <Form.Control
                type="text"
                value={explanation}
                onChange={(e) => {
                    setExplanation(e.target.value);
                }}
                />
            </Col>
            </Form.Group>
        </Form>
        </>
    );
};

export default EvalItem;
