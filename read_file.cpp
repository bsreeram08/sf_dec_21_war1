#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <set>
#include <map>
#include <algorithm>
using namespace std;
#define ull unsigned long long;

union MatchCase{
    int* matches;
    int* distantMatches;
    char* word;
};

class WordCounter {
    public:
    int count;
    WordCounter(): count(0){}
    void operator++ (int){count++;};
};

int main()
{
    fstream file;
    string _word, filename;
    filename = "result.txt";
    vector<MatchCase> match;
    set<string> cases;
    map<string,WordCounter> word_c;
    int patterns, testcases;
    cout<<"Enter the number of patterns : ";
    cin>>patterns;
    testcases = patterns;
    while(testcases--){
        cout<< "Enter the pattern " << patterns - testcases << " : ";
        cin>>_word;
        cases.insert(_word);
    }
    set<string>::iterator itr;
    for (itr = cases.begin(); itr!=cases.end(); ++itr) {
        MatchCase mc;
        string val = *itr;
        mc.word = new char(val.size()+1);
        copy(_word.begin(), _word.end(), mc.word);
        match.push_back(mc);
        mc.distantMatches = (int*) calloc(3,sizeof(int));
        mc.matches = (int*) calloc(_word.size()+1, sizeof(int));
    }
    
    for(int i=0;i<match.size();i++){
        cout<< match.at(i).word<<endl;
    }
    file.open(filename.c_str());
    while (file >> _word)
    {
        word_c[_word]++;
    } 
    map< string, WordCounter,less<string> >::iterator it;
 
    for ( it  = word_c.begin();
          it != word_c.end();
          it++ )
    {
        cout << (*it).first << ", " << (*it).second.count << endl;
    }
    return 0;
}


