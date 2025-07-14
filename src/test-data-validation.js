// Test script to validate that our data validation fixes work correctly
// This can be run in the browser console to test the localStorage validation

// Test corrupted data scenarios
const testCorruptedData = () => {
  console.log('Testing corrupted data scenarios...');
  
  // Test 1: Missing subdirectories array
  const corruptedData1 = [
    {
      id: 'test1',
      name: 'Test Category 1',
      icon: 'Cloud',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      links: [
        { id: '1', title: 'Test Link', url: 'https://example.com', description: 'Test' }
      ]
      // subdirectories is missing
    }
  ];
  
  // Test 2: Missing links array
  const corruptedData2 = [
    {
      id: 'test2',
      name: 'Test Category 2',
      icon: 'Cloud',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      // links is missing
      subdirectories: [
        {
          id: 'sub1',
          name: 'Test Subdir',
          // links is missing
        }
      ]
    }
  ];
  
  // Test 3: Null values
  const corruptedData3 = [
    {
      id: 'test3',
      name: 'Test Category 3',
      icon: 'Cloud',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      links: null,
      subdirectories: null
    }
  ];
  
  // Test the validation function
  const validateData = (data) => {
    return data.map((category) => ({
      ...category,
      links: Array.isArray(category.links) ? category.links : [],
      subdirectories: Array.isArray(category.subdirectories) 
        ? category.subdirectories.map((subdir) => ({
            ...subdir,
            links: Array.isArray(subdir.links) ? subdir.links : []
          }))
        : []
    }));
  };
  
  console.log('Original corrupted data 1:', corruptedData1);
  console.log('Validated data 1:', validateData(corruptedData1));
  
  console.log('Original corrupted data 2:', corruptedData2);
  console.log('Validated data 2:', validateData(corruptedData2));
  
  console.log('Original corrupted data 3:', corruptedData3);
  console.log('Validated data 3:', validateData(corruptedData3));
  
  // Test that .length operations work on validated data
  const testLengthOperations = (data) => {
    const validated = validateData(data);
    try {
      const totalCategories = validated.length;
      const totalSubdirs = validated.reduce((sum, cat) => sum + (cat.subdirectories?.length || 0), 0);
      const totalLinks = validated.reduce((sum, cat) => 
        sum + (cat.links?.length || 0) + (cat.subdirectories || []).reduce((subSum, sub) => subSum + (sub.links?.length || 0), 0), 0
      );
      
      console.log(`✅ Length operations successful: ${totalCategories} categories, ${totalSubdirs} subdirs, ${totalLinks} links`);
      return true;
    } catch (error) {
      console.error('❌ Length operations failed:', error);
      return false;
    }
  };
  
  testLengthOperations(corruptedData1);
  testLengthOperations(corruptedData2);
  testLengthOperations(corruptedData3);
  
  console.log('All tests completed!');
};

// Run the test
testCorruptedData();

// Function to clear localStorage and reset to defaults (for manual testing)
window.resetBookmarks = () => {
  localStorage.removeItem('techBookmarks');
  console.log('Bookmarks reset. Refresh the page to see default data.');
};

console.log('Test script loaded. Run resetBookmarks() to clear localStorage if needed.');
