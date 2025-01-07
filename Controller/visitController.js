const Visit = require('../Model/visitModel');

// Increment Visit Count
exports.incrementVisitCount = async (req, res) => {
    try {
        let visit = await Visit.findOne();
        if (!visit) {
            visit = new Visit({ count: 1 }); // Create a new document if none exists
        } else {
            visit.count += 1; // Increment the count
        }
        await visit.save();
        res.status(200).json({ message: 'Visit counted', userCount: visit.count });
    } catch (error) {
        console.error('Error incrementing visit count:', error);
        res.status(500).json({ message: 'Error incrementing visit count' });
    }
};

// Get Current Visit Count
exports.getVisitCount = async (req, res) => {
    try {
        const visit = await Visit.findOne();
        const count = visit ? visit.count : 0; // Return 0 if no document exists
        res.status(200).json({ userCount: count });
    } catch (error) {
        console.error('Error fetching visit count:', error);
        res.status(500).json({ message: 'Error fetching visit count' });
    }
};
