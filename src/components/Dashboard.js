import React from 'react';

import './Dashboard.css';

function Dashboard() {
    return (
        <div className="Dashboard">
            <main className="main-container">
                <h1 className="greeting black">Welcome back Luis!</h1>
                <section className="action-card-container">

                    <div className="action-card-wrapper">
                        <p className="action-card-title black">Create New Form</p>
                    </div>

                     <div className="action-card-wrapper">
                        <p className="action-card-title black">View Form Status</p>
                    </div>

                     <div className="action-card-wrapper">
                        <p className="action-card-title black">View QR Code</p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
