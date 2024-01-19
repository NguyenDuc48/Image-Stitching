username="ntduc"
/usr/bin/cmake --no-warn-unused-cli -DCMAKE_BUILD_TYPE:STRING=Debug -DCMAKE_EXPORT_COMPILE_COMMANDS:BOOL=TRUE -DCMAKE_C_COMPILER:FILEPATH=/usr/bin/gcc-10 -DCMAKE_CXX_COMPILER:FILEPATH=/usr/bin/g++-10 -S/home/$username/Desktop/ParaPano -B/home/$username/Desktop/ParaPano/build -G "Unix Makefiles"
/usr/bin/cmake --build /home/$username/Desktop/ParaPano/build --config Debug --target all -j 14
cd /home/$username/Desktop/ParaPano/build
./ParaPano