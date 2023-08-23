import './QandA.css'
const QandA = () => {
    return ( 
        <div className="qanda">
            <div className="qa-box">
                <div className="qa-left">
                <Form onSubmit={handleSubmit}>
                <Form.Group className="input-out">
                    <Form.Control className="input-in"
                    type="text"
                    placeholder="Enter username"
                    onChange={(e) => setUname(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="input-out">
                    <Form.Control className="input-in"
                    type="text"
                    placeholder="Register Number "
                    onChange={(e) => setregisterNo(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="input-out" controlId="formBasicEmail">
                    <Form.Control className="input-in"
                    type="email"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="input-out" controlId="formBasicPassword">
                    <Form.Control className="input-in"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                    <div className="lg-button">
                    <button id="log_in" type="Submit">
                    Sign up
                    </button>
                    </div>
        </Form>
                </div>
                <div className="qa-right">

                </div>
            </div>
        </div>
     );
}
 
export default QandA;